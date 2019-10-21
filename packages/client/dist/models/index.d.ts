import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";
/**
 * An interface representing SignUpDto.
 */
export interface SignUpDto {
    email: string;
    password: string;
    displayName: string;
}
/**
 * An interface representing SignInDto.
 */
export interface SignInDto {
    email: string;
    password: string;
}
/**
 * An interface representing AuthDto.
 */
export interface AuthDto {
    accessToken: string;
}
/**
 * An interface representing PasswordResetRequestDto.
 */
export interface PasswordResetRequestDto {
    email: string;
}
/**
 * An interface representing PasswordResetDto.
 */
export interface PasswordResetDto {
    email: string;
    token: string;
    newPassword: string;
}
/**
 * An interface representing UserDto.
 */
export interface UserDto {
    id: string;
    email: string;
    displayName: string;
}
/**
 * An interface representing Carpool.
 */
export interface Carpool {
    id: string;
    created: any;
    updated: any;
    name: string;
    destination: string;
    dateTime: any;
    drivers: string[];
    createdById: string;
    updatedById: string;
}
/**
 * An interface representing CarpoolDto.
 */
export interface CarpoolDto {
    carpoolName: string;
    destination: string;
    dateTime: any;
}
/**
 * An interface representing Car.
 */
export interface Car {
    capacity: number;
    color: string;
    /**
     * Possible values include: 'sedan', 'truck', 'suv', 'van'
     */
    type: Type;
}
/**
 * An interface representing CreateDriverDto.
 */
export interface CreateDriverDto {
    car: Car;
}
/**
 * An interface representing DriverDto.
 */
export interface DriverDto {
    id: string;
    car: Car;
    carpoolId: string;
    user: UserDto;
    seatsRemaining: number;
    passengerUserIds: string[];
}
/**
 * An interface representing CreatePassengerDto.
 */
export interface CreatePassengerDto {
    phoneNumber?: string;
    address: string;
}
/**
 * An interface representing PassengerDto.
 */
export interface PassengerDto {
    id: string;
    phoneNumber: string;
    address: string;
    user: UserDto;
    driverId: string;
}
/**
 * An interface representing VerificationDto.
 */
export interface VerificationDto {
    email: string;
    token: string;
}
/**
 * An interface representing CarpoolAPIOptions.
 */
export interface CarpoolAPIOptions extends ServiceClientOptions {
    baseUri?: string;
}
/**
 * Defines values for Type.
 * Possible values include: 'sedan', 'truck', 'suv', 'van'
 * @readonly
 * @enum {string}
 */
export declare type Type = 'sedan' | 'truck' | 'suv' | 'van';
/**
 * Contains response data for the signIn operation.
 */
export declare type SignInResponse = AuthDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: AuthDto;
    };
};
/**
 * Contains response data for the resetPassword operation.
 */
export declare type ResetPasswordResponse = AuthDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: AuthDto;
    };
};
/**
 * Contains response data for the getMyProfile operation.
 */
export declare type GetMyProfileResponse = UserDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: UserDto;
    };
};
/**
 * Contains response data for the getMyCarpools operation.
 */
export declare type GetMyCarpoolsResponse = Array<Carpool> & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool[];
    };
};
/**
 * Contains response data for the getUserCarpools operation.
 */
export declare type GetUserCarpoolsResponse = Array<Carpool> & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool[];
    };
};
/**
 * Contains response data for the createCarpool operation.
 */
export declare type CreateCarpoolResponse = Carpool & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool;
    };
};
/**
 * Contains response data for the getCarpool operation.
 */
export declare type GetCarpoolResponse = Carpool & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool;
    };
};
/**
 * Contains response data for the updateCarpool operation.
 */
export declare type UpdateCarpoolResponse = Carpool & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool;
    };
};
/**
 * Contains response data for the deleteCarpool operation.
 */
export declare type DeleteCarpoolResponse = Carpool & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Carpool;
    };
};
/**
 * Contains response data for the createDriver operation.
 */
export declare type CreateDriverResponse = DriverDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DriverDto;
    };
};
/**
 * Contains response data for the getDrivers operation.
 */
export declare type GetDriversResponse = Array<DriverDto> & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DriverDto[];
    };
};
/**
 * Contains response data for the createPassenger operation.
 */
export declare type CreatePassengerResponse = PassengerDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: PassengerDto;
    };
};
/**
 * Contains response data for the verifyUser operation.
 */
export declare type VerifyUserResponse = AuthDto & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: AuthDto;
    };
};
