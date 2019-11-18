import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection, In } from "typeorm";

import { Carpool, User, Driver, Passenger } from "../entities";
import { UpsertCarpoolDto, CarpoolDto } from "../dtos";
import { mapCarpoolToDto } from "../mappers";
import { MailerService } from "@nest-modules/mailer";
import { DriverService } from "./driver.service";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        private readonly _mailerService: MailerService // private readonly _driverService: DriverService
    ) {}

    //#region Public
    /**
     * Creates a carpool and returns the new entity.
     * @param carpoolDto - DTO to the create the carpool with
     * @param userId - ID of the user creating the carpool
     */
    public async createCarpool(carpoolDto: UpsertCarpoolDto, user: User): Promise<CarpoolDto> {
        const { destination, carpoolName, dateTime, description } = carpoolDto;

        const carpool = new Carpool();
        carpool.name = carpoolName;
        carpool.description = description || "";
        carpool.destination = destination;
        carpool.dateTime = dateTime;
        carpool.createdBy = user;
        carpool.updatedBy = user;
        carpool.createdById = user.id; // TODO: find a way to auto-attach these fields!
        carpool.updatedById = user.id;

        return mapCarpoolToDto(await this._carpoolRepository.save(carpool));
    }

    /**
     * Finds a carpool by its ID.
     * @param id - ID of the carpool
     */
    public async findCarpoolById(id: string): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne(id, { relations: ["createdBy"] });
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        return mapCarpoolToDto(carpool);
    }

    /**
     * Finds a carpool by its URL ID.
     * @param urlId - URL ID of the carpool
     */
    public async findCarpoolByUrlId(urlId: string): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne({
            where: { urlId },
            relations: ["createdBy"],
        });
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        return mapCarpoolToDto(carpool);
    }

    /**
     * Returns true if the carpool exists.
     * @param id - ID of the carpool
     */
    public async carpoolExists(id: string): Promise<boolean> {
        return this._carpoolRepository.findOne(id) !== undefined;
    }

    /**
     * Finds a list of carpools by the user who created them.
     * @param createdById - ID of the user who created the carpools
     */
    public async findCarpoolsByCreatedBy(createdById: string): Promise<CarpoolDto[]> {
        const carpools = await this._carpoolRepository.find({
            where: { createdById },
            relations: ["createdBy"],
        });
        return carpools.map(carpool => mapCarpoolToDto(carpool));
    }

    /**
     * Updates an existing carpool and returns the updated entity.
     * @param id - ID of the carpool to update
     * @param carpoolDto - DTO to update the carpool with
     * @param user - The User updating the carpool
     */
    public async updateCarpool(
        id: string,
        carpoolDto: UpsertCarpoolDto,
        user: User
    ): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne(id, {
            relations: ["drivers", "drivers.passengers"],
        });
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        const { destination, carpoolName, dateTime, description } = carpoolDto;

        if (destination !== carpool.destination || dateTime !== carpool.dateTime) {
            await this.notifyParticipantsOfCarpoolUpdate(carpool, user);
        }

        //TODO: Add an entity mapper for obvious reasons...
        carpool.name = carpoolName;
        carpool.description = description || "";
        carpool.destination = destination;
        carpool.dateTime = dateTime;
        carpool.updatedById = user.id;

        await this._carpoolRepository.save(carpool);

        return await this.findCarpoolById(id);
    }

    /**
     * Deletes a carpool by its ID and returns the deleted entity.
     * @param id - ID of the carpool to delete.
     */
    public async deleteCarpool(id: string): Promise<Carpool> {
        const carpool = await this._carpoolRepository.findOne(id);
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        return await this._carpoolRepository.remove(carpool);
    }
    //#endregion

    //#region Private

    /**
     * Notifies the participants of a Carpool via email that it has been updated.
     * Does NOT notify the user that performed the update
     * @param carpool - The carpool being updated
     * @param user - The User updating the carpool
     */
    private async notifyParticipantsOfCarpoolUpdate(carpool: Carpool, user: User) {
        let participantIds = [];
        carpool.drivers.map((driver: Driver) => {
            participantIds.push(driver.userId);
            driver.passengers.map((passenger: Passenger) => {
                participantIds.push(passenger.userId);
            });
        });
        const participants = await this._userRepository.find({
            id: In(participantIds),
        });
        const participantEmails = participants
            .filter(x => x.email !== user.email) //Dont email the person that made the update...
            .map((participant: User) => {
                return participant.email;
            });

        //TODO: We gunna need a background job scheduler, maybe bull: https://github.com/nestjsx/nest-bull
        // await this._mailerService.sendMail({})
    }

    //#endregion
}
