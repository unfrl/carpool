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
 * An interface representing AuthDto.
 */
export interface AuthDto {
    accessToken: string;
}
/**
 * An interface representing SignInDto.
 */
export interface SignInDto {
    email: string;
    password: string;
}
/**
 * An interface representing Address.
 */
export interface Address {
    name: string;
    administrative: string;
    county: string;
    city: string;
    country: string;
    countryCode: string;
    postcode: string;
}
/**
 * An interface representing CarpoolDto.
 */
export interface CarpoolDto {
    carpoolName: string;
    destination: Address;
    dateTime: any;
}
/**
 * An interface representing CarpoolModel.
 */
export interface CarpoolModel {
    id: string;
    created: any;
    updated: any;
    name: string;
    destination: Address;
    dateTime: any;
    drivers: string[];
    createdById: string;
    updatedById: string;
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
 * An interface representing CarpoolOptions.
 */
export interface CarpoolOptions extends ServiceClientOptions {
    baseUri?: string;
}
/**
 * Contains response data for the signUp operation.
 */
export declare type SignUpResponse = AuthDto & {
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
/**
 * Contains response data for the getProfile operation.
 */
export declare type GetProfileResponse = UserDto & {
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
