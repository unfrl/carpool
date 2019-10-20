import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Passenger, Driver, User } from "../entities";
import { CreatePassengerDto, CreateUserPassengerDto } from "../dtos";

@Injectable()
export class PassengerService {
    public constructor(
        @InjectRepository(Passenger)
        private readonly _passengerRepository: Repository<Passenger>,
        @InjectRepository(Driver)
        private readonly _driverRepository: Repository<Driver>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) {}

    /**
     * Creates a passenger and returns the new entity.
     * @param driverId - ID of the driver to create a passenger for
     * @param createPassengerDto - DTO to create passenger entity with
     */
    public async createPassenger(
        driverId: string,
        createPassengerDto: CreatePassengerDto
    ): Promise<Passenger> {
        await this.verifyPassengerEligibity(driverId);

        const { name, email, phoneNumber, address } = createPassengerDto;
        const passenger = new Passenger();
        passenger.name = name;
        passenger.email = email;
        passenger.phoneNumber = phoneNumber || "";
        passenger.address = address;

        return await this._passengerRepository.save(passenger);
    }

    /**
     * Creates a passenger from an existing user and returns the new entity.
     * @param userId - ID of the user to create a passenger from
     * @param driverId - ID of the driver to create a passenger for
     * @param createUserPassengerDto - DTO to create passenger entity with
     */
    public async createUserPassenger(
        userId: string,
        driverId: string,
        createUserPassengerDto: CreateUserPassengerDto
    ): Promise<Passenger> {
        await this.verifyPassengerEligibity(driverId, userId);

        const user = await this._userRepository.findOne(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (await this._passengerRepository.findOne({ where: { userId, driverId } })) {
            throw new ConflictException("User is already signed up as a passenger");
        }

        const { phoneNumber, address } = createUserPassengerDto;
        const { id, displayName, email } = user;
        const passenger = new Passenger();
        passenger.name = displayName;
        passenger.email = email;
        passenger.phoneNumber = phoneNumber || "";
        passenger.address = address;
        passenger.userId = id;
        passenger.driverId = driverId;

        return await this._passengerRepository.save(passenger);
    }

    /**
     * Verifies that the driver exists and is not at full capacity.
     * @param driverId - ID of the driver to check passenger eligibility for
     * @param userId - Optional user ID to check against driver record
     */
    private async verifyPassengerEligibity(driverId: string, userId?: string): Promise<void> {
        const driver = await this._driverRepository.findOne(driverId, {
            relations: ["passengers"],
        });

        if (!driver) {
            throw new NotFoundException("Driver not found");
        }

        if (!!userId && driver.id === userId) {
            throw new ConflictException("User is the driver");
        }

        if (driver.passengers.length === driver.car.capacity) {
            throw new ConflictException("Driver is at full capacity");
        }
    }
}
