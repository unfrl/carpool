import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../src/services";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../src/entities";
import { Repository } from "typeorm";

describe("UserService", () => {
    let service: UserService;
    let repo: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it("should return for get", async () => {
        const testUser: User = {
            id: "a47ecdc2-77d6-462f-9045-c440c5e4616f",
            created: new Date(),
            updated: new Date(),
            firstName: "mockFirstname",
            lastName: "mockLastname",
            displayName: "mockDisplayName",
            email: "fake1337@notreal.com",
            password: "password",
            drivers: null,
            passengers: null,
        };

        jest.spyOn(repo, "findOne").mockResolvedValueOnce(Promise.resolve(testUser));
        expect(await service.findOneByEmail(testUser.email)).toBe(testUser);
    });
});
