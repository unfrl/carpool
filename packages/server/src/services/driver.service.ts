import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Driver, Carpool, User } from "../entities";
import { DriverDto } from "../dtos";

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
        driverDto: DriverDto
    ): Promise<Driver> {
        if (!(await this._carpoolRepository.findOne(carpoolId))) {
            throw new NotFoundException("Carpool not found");
        }

        if (!(await this._userRepository.findOne(userId))) {
            throw new NotFoundException("User not found");
        }

        // Only allowing users to sign up once for a carpool
        if (await this._driverRepository.findOne({ where: { carpoolId, userId } })) {
            throw new ConflictException("User is already signed up as a driver");
        }

        const driver = new Driver();
        driver.car = driverDto.car;
        driver.carpoolId = carpoolId;
        driver.userId = userId;

        return await this._driverRepository.save(driver);
    }

    /**
     * Finds a list of drivers signed up for a carpool
     * @param carpoolId - ID of the carpool to find drivers for
     */
    public async findDriversByCarpoolId(carpoolId: string): Promise<Driver[]> {
        return await this._driverRepository.find({ where: { carpoolId } });
    }
}
