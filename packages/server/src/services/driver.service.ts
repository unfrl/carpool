import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Driver, Carpool, User, Passenger } from "../entities";
import { UpsertDriverDto, DriverDto } from "../dtos";
import { mapDriverToDto } from "../mappers";
import { InjectQueue } from "nest-bull";
import { sendEmailFunctionName } from "../processors";
import { Queue } from "bull";
import { appConfig } from "@carpool/common";
import { ENGINE_METHOD_DIGESTS } from "constants";

@Injectable()
export class DriverService {
    public constructor(
        @InjectRepository(Driver)
        private readonly _driverRepository: Repository<Driver>,
        @InjectRepository(Carpool)
        private readonly _carpoolRepository: Repository<Carpool>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        @InjectRepository(Passenger)
        private readonly _passengerRepository: Repository<Passenger>,
        @InjectQueue("bull")
        readonly mailQueue: Queue
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
        driverDto: UpsertDriverDto
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

        return mapDriverToDto(driver);
    }

    /**
     * Remove the driver from the specified carpool
     * @param id
     * @param userId
     */
    public async deleteDriver(carpoolId: string, driverId: string): Promise<Driver> {
        const carpool = await this._carpoolRepository.findOne(carpoolId);
        if (!carpool) {
            throw new NotFoundException("Carpool not found");
        }

        const driver = await this._driverRepository.findOne({
            where: { carpoolId, id: driverId },
            relations: ["passengers", "passengers.user", "user"],
        });
        if (!driver) {
            throw new NotFoundException(
                "No Driver was found with the provided carpoolId and userId"
            );
        }

        await this._passengerRepository.remove(driver.passengers);
        const removedDriver = await this._driverRepository.remove(driver);
        let passengerEmails = [];
        removedDriver.passengers.map((passenger: Passenger) => {
            passengerEmails.push(passenger.user.email);
        });
        let carpoolUrl = `${appConfig.scheme}://${appConfig.host}/${carpool.urlId}/${carpool.name}`;

        await Promise.all(
            passengerEmails.map((email: string) => {
                return this.mailQueue.add(sendEmailFunctionName, {
                    to: email,
                    from: "noreply@carpool+unfrl.com",
                    subject: "Your driver has removed themselves",
                    html: `<h1>Hello!</h1>\n<p>Your driver has removed themselves, please go to <a href=\"${carpoolUrl}\">${carpoolUrl}</a> to see pick a different one or to offer to drive.</p>`,
                });
            })
        );

        removedDriver.id = driverId;

        return removedDriver;
    }

    /**
     * Finds the driver ID for a user in a carpool, returning undefined if not found.
     * @param userId - ID of the user to check for as a driver
     * @param carpoolId - ID of the carpool to find driver for
     */
    public async findDriverIdByUserCarpoolId(
        userId: string,
        carpoolId: string
    ): Promise<string | undefined> {
        const driver = await this._driverRepository.findOne({
            where: { userId, carpoolId },
        });

        return driver?.id;
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

        return drivers.map(driver => mapDriverToDto(driver));
    }

    /**
     * Finds one driver by its ID.
     * @param id - ID of the driver to find
     */
    public async findDriverById(id: string): Promise<DriverDto> {
        const driver = await this._driverRepository.findOne({
            where: { id },
            relations: ["user", "passengers"],
        });

        if (!driver) {
            throw new NotFoundException("Driver not found");
        }

        return mapDriverToDto(driver);
    }
}
