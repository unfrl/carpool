import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Driver, Carpool, User } from "../entities";
import { CreateDriverDto, DriverDto } from "../dtos";

@Injectable()
export class DriverService {
    public constructor(
        @InjectRepository(Driver)
        private readonly _driverRepository: Repository<Driver>,
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) {}

    /**
     * Creates a driver and returns the new entity.
     * @param carpoolId - ID of the carpool to assign the driver to
     * @param userId - ID of the user who is driving
     * @param driverDto - DTO to create driver entity with
     */
    public async createDriver(
        carpoolId: string,
        userId: string,
        driverDto: CreateDriverDto
    ): Promise<DriverDto> {
        if (!(await this._carpoolRepository.findOne(carpoolId))) {
            throw new NotFoundException("Carpool not found");
        }

        const user = await this._userRepository.findOne(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Only allowing users to sign up once for a carpool
        if (await this._driverRepository.findOne({ where: { carpoolId, userId } })) {
            throw new ConflictException("User is already signed up as a driver");
        }

        const { car } = driverDto;
        const driver = new Driver();
        driver.car = car;
        driver.carpoolId = carpoolId;
        driver.userId = userId;

        await this._driverRepository.save(driver);

        return {
            id: driver.id,
            car,
            carpoolId,
            user: {
                id: user.id,
                displayName: user.displayName,
                email: user.email,
            },
            seatsRemaining: car.capacity,
        };
    }

    /**
     * Finds a list of drivers signed up for a carpool
     * @param carpoolId - ID of the carpool to find drivers for
     */
    public async findDriversByCarpoolId(carpoolId: string): Promise<DriverDto[]> {
        const drivers = await this._driverRepository.find({
            where: { carpoolId },
            relations: ["user", "passengers"],
        });

        return drivers.map(driver => ({
            id: driver.id,
            car: driver.car,
            carpoolId: driver.carpoolId,
            seatsRemaining: driver.car.capacity - driver.passengers.length,
            user: {
                id: driver.user.id,
                displayName: driver.user.displayName,
                email: driver.user.email,
            },
        }));
    }
}
