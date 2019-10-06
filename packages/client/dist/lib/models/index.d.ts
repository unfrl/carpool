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
    /**
     * @member {string} accessToken
     */
    accessToken: string;
}
/**
 * @interface
 * An interface representing AuthDto.
 */
export interface AuthDto {
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
 * An interface representing Address.
 */
export interface Address {
    /**
     * @member {string} name
     */
    name: string;
    /**
     * @member {string} administrative
     */
    administrative: string;
    /**
     * @member {string} county
     */
    county: string;
    /**
     * @member {string} city
     */
    city: string;
    /**
     * @member {string} country
     */
    country: string;
    /**
     * @member {string} countryCode
     */
    countryCode: string;
    /**
     * @member {string} postcode
     */
    postcode: string;
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
     * @member {Address} destination
     */
    destination: Address;
    /**
     * @member {any} dateTime
     */
    dateTime: any;
}
/**
 * @interface
 * An interface representing CarpoolModel.
 */
export interface CarpoolModel {
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
     * @member {Address} destination
     */
    destination: Address;
    /**
     * @member {any} dateTime
     */
    dateTime: any;
    /**
     * @member {string[]} drivers
     */
    drivers: string[];
}
/**
 * @interface
 * An interface representing CarpoolOptions.
 * @extends ServiceClientOptions
 */
export interface CarpoolOptions extends ServiceClientOptions {
    /**
     * @member {string} [baseUri]
     */
    baseUri?: string;
}
/**
 * Contains response data for the signUp operation.
 */
export declare type SignUpResponse = UserDto & {
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
 * Contains response data for the signIn operation.
 */
export declare type SignInResponse = UserDto & {
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
 * Contains response data for the createCarpool operation.
 */
export declare type CreateCarpoolResponse = CarpoolModel & {
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
        parsedBody: CarpoolModel;
    };
};
/**
 * Contains response data for the getCarpool operation.
 */
export declare type GetCarpoolResponse = CarpoolModel & {
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
        parsedBody: CarpoolModel;
    };
};
/**
 * Contains response data for the updateCarpool operation.
 */
export declare type UpdateCarpoolResponse = CarpoolModel & {
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
        parsedBody: CarpoolModel;
    };
};
/**
 * Contains response data for the deleteCarpool operation.
 */
export declare type DeleteCarpoolResponse = CarpoolModel & {
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
        parsedBody: CarpoolModel;
    };
};
