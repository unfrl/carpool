import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carpool } from "../entities";
import { Repository } from "typeorm";
import { EventService } from "./event.service";
import { UpdateCarpoolDto, CreateCarpoolDto } from "../dtos";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        private readonly _eventService: EventService
    ) {}

    //TODO: Comment this :)
    public async create(createCarpoolDto: CreateCarpoolDto): Promise<Carpool> {
        const { destination, eventId } = createCarpoolDto;
        let carpoolName = createCarpoolDto.carpoolName;

        if (!destination) {
            throw new Error("Carpools require a destination");
        }
        if (!eventId) {
            throw new Error("An eventId must be specified when creating a Carpool");
        }

        const event = await this._eventService.get(eventId, true);
        if (!event) {
            throw new Error("No event could be found with the provided eventId");
        }
        if (!carpoolName) {
            carpoolName = `${event.name} carpool`;
        }
        if (event.carpools.find(x => x.name == carpoolName)) {
            let count = 1;
            carpoolName = `${carpoolName} (${count})`;
            while (event.carpools.find(x => x.name == `${carpoolName}`)) {
                count++;
                carpoolName = `${carpoolName} (${count})`;
            }
        }

        const carpool = new Carpool();
        carpool.name = createCarpoolDto.carpoolName;
        carpool.destination = createCarpoolDto.destination;
        carpool.eventId = createCarpoolDto.eventId;

        return await this._carpoolRepository.save(carpool);
    }

    public async get(id: string): Promise<Carpool> {
        let carpool = await this._carpoolRepository.findOneOrFail(id);
        return carpool;
    }

    public async update(id: string, updateCarpoolDto: UpdateCarpoolDto): Promise<Carpool> {
        let carpool = await this._carpoolRepository.findOneOrFail(id);

        //TODO: Add an entity mapper for obvious reasons...
        carpool.name = updateCarpoolDto.carpoolName;
        carpool.destination = updateCarpoolDto.destination;
        carpool.passengers = updateCarpoolDto.passengers;
        carpool.drivers = updateCarpoolDto.drivers;
        return await this._carpoolRepository.save(carpool);
    }

    //TODO: Comment this :)
    public async delete(id: string): Promise<Carpool> {
        let carpool = await this._carpoolRepository.findOneOrFail(id);
        return await this._carpoolRepository.remove(carpool);
    }
}
