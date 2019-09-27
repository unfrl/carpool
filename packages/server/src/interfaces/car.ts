export enum CarType {
    sedan = "Sedan",
    truck = "Truck",
    suv = "SUV",
    van = "Van",
}

export interface Car {
    capacity: number;

    color: string;

    type: CarType;
}
