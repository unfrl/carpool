import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";
/**
 * @interface
 * An interface representing SignUpDto.
 */
export interface SignUpDto {
    /**
     * @member {string} email
     */
    email: string;
    /**
     * @member {string} password
     */
    password: string;
    /**
     * @member {string} displayName
     */
    displayName: string;
}
/**
 * @interface
 * An interface representing SignInDto.
 */
export interface SignInDto {
    /**
     * @member {string} email
     */
    email: string;
    /**
     * @member {string} password
     */
    password: string;
}
/**
 * @interface
 * An interface representing AuthDto.
 */
export interface AuthDto {
    /**
     * @member {string} accessToken
     */
    accessToken: string;
}
/**
 * @interface
 * An interface representing UserDto.
 */
export interface UserDto {
    /**
     * @member {string} id
     */
    id: string;
    /**
     * @member {string} email
     */
    email: string;
    /**
     * @member {string} displayName
     */
    displayName: string;
}
/**
 * @interface
 * An interface representing Carpool.
 */
export interface Carpool {
    /**
     * @member {string} id
     */
    id: string;
    /**
     * @member {any} created
     */
    created: any;
    /**
     * @member {any} updated
     */
    updated: any;
    /**
     * @member {string} name
     */
    name: string;
    /**
     * @member {string} destination
     */
    destination: string;
    /**
     * @member {any} dateTime
     */
    dateTime: any;
    /**
     * @member {string[]} drivers
     */
    drivers: string[];
    /**
     * @member {string} createdById
     */
    createdById: string;
    /**
     * @member {string} updatedById
     */
    updatedById: string;
}
/**
 * @interface
 * An interface representing CarpoolDto.
 */
export interface CarpoolDto {
    /**
     * @member {string} carpoolName
     */
    carpoolName: string;
    /**
     * @member {string} destination
     */
    destination: string;
    /**
     * @member {any} dateTime
     */
    dateTime: any;
}
/**
 * @interface
 * An interface representing Car.
 */
export interface Car {
    /**
     * @member {number} capacity
     */
    capacity: number;
    /**
     * @member {string} color
     */
    color: string;
    /**
     * @member {Type} type Possible values include: 'sedan', 'truck', 'suv',
     * 'van'
     */
    type: Type;
}
/**
 * @interface
 * An interface representing CreateDriverDto.
 */
export interface CreateDriverDto {
    /**
     * @member {Car} car
     */
    car: Car;
}
/**
 * @interface
 * An interface representing DriverDto.
 */
export interface DriverDto {
    /**
     * @member {Car} car
     */
    car: Car;
    /**
     * @member {string} carpoolId
     */
    carpoolId: string;
    /**
     * @member {UserDto} user
     */
    user: UserDto;
}
/**
 * @interface
 * An interface representing VerificationDto.
 */
export interface VerificationDto {
    /**
     * @member {string} email
     */
    email: string;
    /**
     * @member {string} token
     */
    token: string;
}
/**
 * @interface
 * An interface representing CarpoolAPIOptions.
 * @extends ServiceClientOptions
 */
export interface CarpoolAPIOptions extends ServiceClientOptions {
    /**
     * @member {string} [baseUri]
     */
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
