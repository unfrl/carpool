import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "src/dtos";
import { Event, Carpool } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateEventDto } from "src/dtos/update-event.dto";

@Injectable()
export class EventService {
    public constructor(
        @InjectRepository(Event)
        private readonly _eventRepository: Repository<Event>,
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>
    ) {}

    //TODO: Comment this
    public async create(createEventDto: CreateEventDto): Promise<Event> {
        const { eventName, dateTime } = createEventDto;
        if (!eventName || !dateTime) {
            throw new Error("Events require a name and date");
        }
        const event = new Event();
        event.name = createEventDto.eventName;
        event.dateTime = createEventDto.dateTime;

        return await this._eventRepository.save(event);
    }

    //TODO: Comment this :)
    public async get(eventId: string, includeCarpools: boolean = false) {
        if (includeCarpools) {
            return await this._eventRepository.findOne(eventId, { relations: ["carpools"] });
        }
        return await this._eventRepository.findOne(eventId);
    }

    public async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        let event = await this._eventRepository.findOneOrFail(id);

        //TODO: Add an entity mapper
        event.name = updateEventDto.eventName;
        event.dateTime = updateEventDto.dateTime;
        return await this._eventRepository.save(event);
    }

    //TODO: Comment this :)
    public async delete(id: string): Promise<Event> {
        let event = await this._eventRepository.findOneOrFail(id, { relations: ["carpools"] });

        if (event.carpools.values.length > 0) {
            event.carpools.forEach(carpool => {
                this._carpoolRepository.delete(carpool.id);
            });
        }

        return await this._eventRepository.remove(event);
    }
}
