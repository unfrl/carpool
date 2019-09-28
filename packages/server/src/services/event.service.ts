import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "src/dtos";
import { Event } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EventService {
    public constructor(
        @InjectRepository(Event)
        private readonly _eventRepository: Repository<Event>
    ) {}

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

    public async get(eventId: string, includeCarpools: boolean = false) {
        if (includeCarpools) {
            return await this._eventRepository.findOne(eventId, { relations: ["carpools"] });
        }
        return await this._eventRepository.findOne(eventId);
    }
}
