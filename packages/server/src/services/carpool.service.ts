import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Carpool, User } from "../entities";
import { UpsertCarpoolDto, CarpoolDto } from "../dtos";
import { mapCarpoolToDto } from "../mappers";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>
    ) {}

    /**
     * Creates a carpool and returns the new entity.
     * @param carpoolDto - DTO to the create the carpool with
     * @param userId - ID of the user creating the carpool
     */
    public async createCarpool(carpoolDto: UpsertCarpoolDto, user: User): Promise<CarpoolDto> {
        const { destination, carpoolName, dateTime } = carpoolDto;

        const carpool = new Carpool();
        carpool.name = carpoolName;
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
     * @param userId - ID of the user updating the carpool
     */
    public async updateCarpool(
        id: string,
        carpoolDto: UpsertCarpoolDto,
        userId: string
    ): Promise<CarpoolDto> {
        const carpool = await this._carpoolRepository.findOne(id);
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        const { destination, carpoolName, dateTime } = carpoolDto;
        //TODO: Add an entity mapper for obvious reasons...
        carpool.name = carpoolName;
        carpool.destination = destination;
        carpool.dateTime = dateTime;
        carpool.updatedById = userId;

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
}
