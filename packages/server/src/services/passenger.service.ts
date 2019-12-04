import {
    Injectable,
    NotFoundException,
    ConflictException,
    ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Passenger, Driver, User } from "../entities";
import { UpsertPassengerDto, PassengerDto } from "../dtos";
import { mapPassengerToDto } from "../mappers";

@Injectable()
export class PassengerService {
    public constructor(
        @InjectRepository(Passenger)
        private readonly _passengerRepository: Repository<Passenger>,
        @InjectRepository(Driver)
        private readonly _driverRepository: Repository<Driver>,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) { }

    /**
     * Creates a passenger from an existing user and returns the new entity.
     * @param userId - ID of the user to create a passenger from
     * @param driverId - ID of the driver to create a passenger for
     * @param createPassengerDto - DTO to create passenger entity with
     */
    public async createPassenger(
        userId: string,
        driverId: string,
        createPassengerDto: UpsertPassengerDto
    ): Promise<PassengerDto> {
        await this.verifyPassengerEligibity(driverId, userId);

        const user = await this._userRepository.findOne(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (await this._passengerRepository.findOne({ where: { userId, driverId } })) {
            throw new ConflictException("User is already signed up as a passenger");
        }

        const { phoneNumber, address } = createPassengerDto;
        const { id } = user;

        const passenger = new Passenger();
        passenger.phoneNumber = phoneNumber || "";
        passenger.address = address;
        passenger.userId = id;
        passenger.user = user;
        passenger.driverId = driverId;

        return mapPassengerToDto(await this._passengerRepository.save(passenger));
    }

    /**
     * Deletes a passenger for an existing user and driver.
     * @param userId - ID of the user to remove as passenger
     * @param driverId - ID of the driver to remove passenger from
     */
    public async deletePassenger(userId: string, driverId: string): Promise<PassengerDto> {
        const passenger = await this._passengerRepository.findOne({ where: { userId, driverId }, relations: ["user"] });
        if (!passenger) {
            throw new NotFoundException("Passenger not found");
        }
        const id = passenger.id;
        await this._passengerRepository.remove(passenger);
        passenger.id = id;
        return mapPassengerToDto(passenger);
    }

    /**
     * Gets collection of passengers for the driver.
     * @param userId - ID of the user requesting passengers
     * @param driverId - ID of the driver to pull passengers for
     */
    public async getPassengers(userId: string, driverId: string): Promise<PassengerDto[]> {
        const driver = await this._driverRepository.findOne(driverId);
        if (!driver) {
            throw new NotFoundException("Driver not found");
        }

        if (driver.userId !== userId) {
            throw new ForbiddenException("User is not the driver");
        }

        const passengers = await this._passengerRepository.find({
            where: { driverId },
            relations: ["user"],
        });

        return passengers.map(p => mapPassengerToDto(p));
    }

    /**
     * Verifies that the driver exists and is not at full capacity.
     * @param driverId - ID of the driver to check passenger eligibility for
     * @param userId - Optional user ID to check against driver record
     */
    private async verifyPassengerEligibity(driverId: string, userId: string): Promise<void> {
        const driver = await this._driverRepository.findOne(driverId, {
            relations: ["passengers"],
        });

        if (!driver) {
            throw new NotFoundException("Driver not found");
        }

        if (driver.id === userId) {
            throw new ConflictException("User is the driver");
        }

        if (driver.passengers.length === driver.car.capacity) {
            throw new ConflictException("Driver is at full capacity");
        }
    }
}
