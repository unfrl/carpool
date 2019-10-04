import { EventService } from "../src/services";
import { Repository } from "typeorm";
import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Event, Carpool } from "../src/entities";
import { TestUtils } from "./test.utils";

describe("EventService", () => {
    let service: EventService;
    let eventRepository: Repository<Event>;
    let carpoolRepository: Repository<Carpool>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventService,
                {
                    provide: getRepositoryToken(Event),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Carpool),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<EventService>(EventService);
        eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
        carpoolRepository = module.get<Repository<Carpool>>(getRepositoryToken(Carpool));
    });

    it("should return correct instance from get", async () => {
        let testEvent = TestUtils.getTestEvent();
        jest.spyOn(eventRepository, "findOne").mockResolvedValueOnce(Promise.resolve(testEvent));
        expect(await service.get(testEvent.id)).toBe(testEvent);
    });
});
