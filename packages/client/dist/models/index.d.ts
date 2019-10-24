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
 * An interface representing GoogleSignInDto.
 */
export interface GoogleSignInDto {
    idToken: string;
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
 * An interface representing CarpoolDto.
 */
export interface CarpoolDto {
    id: string;
    name: string;
    urlId: string;
    destination: string;
    dateTime: any;
    created: any;
    updated: any;
    user: UserDto;
}
/**
 * An interface representing UpsertCarpoolDto.
 */
export interface UpsertCarpoolDto {
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
 * An interface representing UpsertDriverDto.
 */
export interface UpsertDriverDto {
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
 * An interface representing UpsertPassengerDto.
 */
export interface UpsertPassengerDto {
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
 * Contains response data for the signInWithGoogle operation.
 */
export declare type SignInWithGoogleResponse = AuthDto & {
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
export declare type GetMyCarpoolsResponse = Array<CarpoolDto> & {
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
        parsedBody: CarpoolDto[];
    };
};
/**
 * Contains response data for the getUserCarpools operation.
 */
export declare type GetUserCarpoolsResponse = Array<CarpoolDto> & {
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
        parsedBody: CarpoolDto[];
    };
};
/**
 * Contains response data for the createCarpool operation.
 */
export declare type CreateCarpoolResponse = CarpoolDto & {
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
        parsedBody: CarpoolDto;
    };
};
/**
 * Contains response data for the getCarpool operation.
 */
export declare type GetCarpoolResponse = CarpoolDto & {
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
        parsedBody: CarpoolDto;
    };
};
/**
 * Contains response data for the updateCarpool operation.
 */
export declare type UpdateCarpoolResponse = CarpoolDto & {
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
        parsedBody: CarpoolDto;
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
 * Contains response data for the getPassengers operation.
 */
export declare type GetPassengersResponse = Array<PassengerDto> & {
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
        parsedBody: PassengerDto[];
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
