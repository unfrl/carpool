import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Carpool } from "../entities";
import { CarpoolDto } from "../dtos";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>
    ) {}

    //TODO: Comment this :)
    public async create(carpoolDto: CarpoolDto): Promise<Carpool> {
        const { destination, carpoolName, dateTime } = carpoolDto;

        const carpool = new Carpool();
        carpool.name = carpoolName;
        carpool.destination = destination;
        carpool.dateTime = dateTime;

        return await this._carpoolRepository.save(carpool);
    }

    public async get(id: string): Promise<Carpool> {
        const carpool = await this._carpoolRepository.findOne(id);
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        return carpool;
    }

    public async update(id: string, carpoolDto: CarpoolDto): Promise<Carpool> {
        const carpool = await this._carpoolRepository.findOne(id);
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        const { destination, carpoolName, dateTime } = carpoolDto;
        //TODO: Add an entity mapper for obvious reasons...
        carpool.name = carpoolName;
        carpool.destination = destination;
        carpool.dateTime = dateTime;

        return await this._carpoolRepository.save(carpool);
    }

    //TODO: Comment this :)
    public async delete(id: string): Promise<Carpool> {
        const carpool = await this._carpoolRepository.findOne(id);
        if (!carpool) {
            throw new NotFoundException("No Carpool was found with the provided ID");
        }

        return await this._carpoolRepository.remove(carpool);
    }
}
