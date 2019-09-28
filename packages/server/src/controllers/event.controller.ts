import { Post, HttpCode, Body, HttpStatus, HttpException, Controller } from "@nestjs/common";
import { ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { CreateEventDto } from "../dtos";
import { Event } from "../entities";
import { EventService } from "src/services/event.service";

@ApiUseTags("Event")
@Controller("api/v1/event")
export class EventController {
    public constructor(private readonly _eventService: EventService) {}

    @ApiOperation({
        operationId: "createEvent",
        title: "Create Event",
        description: "Create a new Event",
    })
    @Post()
    @HttpCode(HttpStatus.OK)
    public async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
        const event = await this._eventService.create(createEventDto);
        if (!event) {
            throw new HttpException("Failed to create Event", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return event;
    }
}
