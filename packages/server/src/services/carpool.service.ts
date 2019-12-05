import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { appConfig } from "@carpool/common";
import { Carpool, User, Driver, Passenger } from "../entities";
import {
    UpsertCarpoolDto,
    CarpoolDto,
    CarpoolQueryResponseDto,
    CarpoolQueryType,
    CarpoolMetadataDto,
} from "../dtos";
import { mapCarpoolToDto } from "../mappers";
import { Queue } from "bull";
import { InjectQueue } from "nest-bull";
import { sendEmailFunctionName } from "../processors";
import { DriverService } from "./driver.service";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        @InjectRepository(Driver)
        private readonly _driverRepository: Repository<Driver>,
        @InjectRepository(Passenger)
        private readonly _passengerRepository: Repository<Passenger>,
        @InjectQueue("bull") readonly mailQueue: Queue,
        private readonly _driverService: DriverService
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
    public async findCarpoolById(id: string, includeMetadata = false): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne(id, { relations: ["createdBy"] });
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        let carpoolDto = mapCarpoolToDto(carpool);
        if (includeMetadata) {
            carpoolDto = await this.addCarpoolMetadata(carpoolDto);
        }
        return carpoolDto;
    }

    /**
     * Finds a carpool by its URL ID.
     * @param urlId - URL ID of the carpool
     */
    public async findCarpoolByUrlId(urlId: string, includeMetadata = false): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne({
            where: { urlId },
            relations: ["createdBy"],
        });
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        let carpoolDto = mapCarpoolToDto(carpool);
        if (includeMetadata) {
            carpoolDto = await this.addCarpoolMetadata(carpoolDto);
        }
        return carpoolDto;
    }

    /**
     * Retrives the metadata for a given carpool
     * @param carpoolId - ID of the carpool whose metadata will be retrieved
     */
    public async getCarpoolMetadata(carpoolId: string): Promise<CarpoolMetadataDto> {
        let metaData = new CarpoolMetadataDto();
        const drivers = await this._driverService.findDriversByCarpoolId(carpoolId);
        metaData.driverCount = drivers.length;
        let seatsRemaining = 0;
        for (const driver of drivers) {
            seatsRemaining += driver.seatsRemaining;
        }
        metaData.seatsRemaining = seatsRemaining;
        return metaData;
    }

    private async addCarpoolMetadata(carpool: CarpoolDto): Promise<CarpoolDto> {
        carpool.metadata = await this.getCarpoolMetadata(carpool.id);
        return carpool;
    }

    /**
     * Returns true if the carpool exists.
     * @param id - ID of the carpool
     */
    public async carpoolExists(id: string): Promise<boolean> {
        return this._carpoolRepository.findOne(id) !== undefined;
    }

    /**
     * Query on one or more types (specified in the CarpoolQueryDto) for the user's carpools.
     * @param userId - ID of the user to query on behalf of
     * @param query - The query to perform
     */
    public async queryCarpoolsByUser(
        userId: string,
        type: string
    ): Promise<CarpoolQueryResponseDto[]> {
        const processQueryType = (type: CarpoolQueryType): Promise<CarpoolDto[]> => {
            switch (type) {
                case CarpoolQueryType.created:
                    return this.findCarpoolsByCreatedBy(userId);
                case CarpoolQueryType.driving:
                    return this.findCarpoolsByDriver(userId);
                case CarpoolQueryType.passenger:
                    return this.findCarpoolsByPassenger(userId);
                default:
                    throw new BadRequestException("Unrecognized carpool query type");
            }
        };

        const response: CarpoolQueryResponseDto[] = [];

        // TODO: wasn't able to get nest to parse as an array, only as comma delimited string, so it needs to be split and converted to CarpoolQueryType
        for (const strType of type.split(",")) {
            const queryType = strType as CarpoolQueryType;
            const carpools = await processQueryType(queryType);

            response.push(...carpools.map(carpool => ({ type: queryType, carpool })));
        }

        return response;
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
     * Finds a list of carpools that the user is driving for.
     * @param userId - ID of the user who is driving
     */
    public async findCarpoolsByDriver(userId: string): Promise<CarpoolDto[]> {
        const drivers = await this._driverRepository.find({
            where: { userId },
            relations: ["carpool", "carpool.createdBy"],
        });

        return drivers.map(driver => mapCarpoolToDto(driver.carpool));
    }

    /**
     * Finds the carpool that the givern driver is driving in
     * @param driverId - ID of the driver who is in the carpool
     */
    public async findCarpoolIdByDriverId(driverId: string): Promise<string> {
        const driver = await this._driverRepository.findOneOrFail(driverId);
        return driver.carpoolId;
    }
    /**
     * Finds a list of carpools that the user is a passenger for.
     * @param userId - ID of the user who is a passenger
     */
    public async findCarpoolsByPassenger(userId: string): Promise<CarpoolDto[]> {
        const passengers = await this._passengerRepository.find({
            where: { userId },
            relations: ["driver", "driver.carpool", "driver.carpool.createdBy"],
        });

        return passengers.map(passenger => mapCarpoolToDto(passenger.driver.carpool));
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
        let cleanDateTime = new Date(dateTime);
        if (
            destination !== carpool.destination ||
            cleanDateTime.getTime() !== carpool.dateTime.getTime()
        ) {
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

        const participants = await this._userRepository.findByIds(participantIds);

        const participantEmails = participants
            .filter(x => x.email !== user.email) //Dont email the person that made the update...
            .map((participant: User) => {
                return participant.email;
            });

        let carpoolUrl = `${appConfig.scheme}://${appConfig.host}/${carpool.urlId}/${carpool.name}`;

        await Promise.all(
            participantEmails.map((email: string) => {
                return this.mailQueue.add(sendEmailFunctionName, {
                    to: email,
                    from: "noreply@carpool+unfrl.com",
                    subject: "A carpool you are participating in has been updated!",
                    html: `<h1>Hello!</h1>\n<p>A carpool you are participating in has been updated, please go to <a href=\"${carpoolUrl}\">${carpoolUrl}</a> to see the updates</p>`,
                });
            })
        );
    }

    //#endregion
}
