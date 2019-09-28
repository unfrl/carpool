import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCarpoolDto } from "src/dtos";
import { Carpool } from "src/entities";
import { Repository } from "typeorm";
import { EventService } from "./event.service";

@Injectable()
export class CarpoolService {
    public constructor(
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        private readonly _eventService: EventService
    ) {}

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
}
