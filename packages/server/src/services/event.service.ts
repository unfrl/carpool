import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { CreateEventDto } from "src/dtos";
import { Event, Carpool } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateEventDto } from "src/dtos/update-event.dto";
import * as IORedis from "ioredis";

@Injectable()
export class EventService {
    public constructor(
        @InjectRepository(Event)
        private readonly _eventRepository: Repository<Event>,
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>
    ) // @Inject(IORedis)
    // private readonly _redisClient: IORedis.Redis
    {}

    //TODO: Comment this
    public async create(createEventDto: CreateEventDto): Promise<Event> {
        // await this._redisClient.setex("test_key", 20, "test_value");
        const { eventName, dateTime } = createEventDto;
        const event = new Event();
        event.name = eventName;
        event.dateTime = dateTime;

        return await this._eventRepository.save(event);
    }

    //TODO: Comment this :)
    public async get(eventId: string, includeCarpools: boolean = false) {
        let event: Event;
        if (includeCarpools) {
            event = await this._eventRepository.findOne(eventId, { relations: ["carpools"] });
        }
        event = await this._eventRepository.findOne(eventId);
        if (!event) {
            throw new NotFoundException("No Event Found with the provided ID");
        }
        return event;
    }

    public async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        let event = await this._eventRepository.findOne(id);
        if (!event) {
            throw new NotFoundException("No event found with the provided ID");
        }

        //TODO: Add an entity mapper
        event.name = updateEventDto.eventName;
        event.dateTime = updateEventDto.dateTime;
        return await this._eventRepository.save(event);
    }

    //TODO: Comment this :)
    public async delete(id: string): Promise<Event> {
        let event = await this._eventRepository.findOne(id, { relations: ["carpools"] });
        if (!event) {
            throw new NotFoundException("No event found with the provided ID");
        }

        if (event.carpools.values.length > 0) {
            event.carpools.forEach(carpool => {
                this._carpoolRepository.delete(carpool.id);
            });
        }

        return await this._eventRepository.remove(event);
    }
}
