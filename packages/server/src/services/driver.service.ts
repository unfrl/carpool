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
        driver.user = user;
        driver.passengers = [];

        await this._driverRepository.save(driver);

        return this.mapDriverToDto(driver);
    }

    /**
     * Finds a list of drivers signed up for a carpool.
     * @param carpoolId - ID of the carpool to find drivers for
     */
    public async findDriversByCarpoolId(carpoolId: string): Promise<DriverDto[]> {
        const drivers = await this._driverRepository.find({
            where: { carpoolId },
            relations: ["user", "passengers"],
        });

        return drivers.map(driver => this.mapDriverToDto(driver));
    }

    /**
     * Finds one driver by its ID.
     * @param id - ID of the driver to find
     */
    public async findOneById(id: string): Promise<DriverDto> {
        const driver = await this._driverRepository.findOne({
            where: { id },
            relations: ["user", "passengers"],
        });

        if (!driver) {
            throw new NotFoundException("Driver not found");
        }

        return this.mapDriverToDto(driver);
    }

    /**
     * Maps a driver entity to its corresponding DTO.
     * @param driver - Driver to map to DTO
     */
    private mapDriverToDto(driver: Driver): DriverDto {
        const { car, carpoolId, user, passengers } = driver;

        return {
            id: driver.id,
            car,
            carpoolId,
            user: {
                id: user.id,
                displayName: user.displayName,
                email: user.email,
            },
            seatsRemaining: car.capacity - (passengers || []).length,
            // TODO: TEMPORARY! Needs to be replaced with a DTO or removed!
            passengers,
        };
    }
}
