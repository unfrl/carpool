## API Report File for "@unfrl/carpool-sdk"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreHttp from '@azure/core-http';

// @public (undocumented)
export interface AuthDto {
    // (undocumented)
    accessToken: string;
}

// @public (undocumented)
export interface Car {
    // (undocumented)
    capacity: number;
    // (undocumented)
    color: string;
    // (undocumented)
    type: CarType;
}

// @public (undocumented)
export class CarpoolAPI extends CarpoolAPIContext {
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, $host: string, options?: CarpoolAPIOptionalParams);
    createCarpool(body: UpsertCarpoolDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPICreateCarpoolResponse>;
    createDriver(id: string, body: UpsertDriverDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPICreateDriverResponse>;
    createPassenger(id: string, body: UpsertPassengerDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPICreatePassengerResponse>;
    deleteCarpool(id: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    deletePassenger(id: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    getCarpool(id: string, includeMetadata: boolean, options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetCarpoolResponse>;
    getDrivers(id: string, options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetDriversResponse>;
    getMyCarpools(typeParam: string, options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetMyCarpoolsResponse>;
    getMyProfile(options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetMyProfileResponse>;
    getPassengers(id: string, options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetPassengersResponse>;
    getUserCarpools(displayName: string, options?: coreHttp.OperationOptions): Promise<CarpoolAPIGetUserCarpoolsResponse>;
    requestPasswordReset(body: PasswordResetRequestDto, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    resetPassword(body: PasswordResetDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPIResetPasswordResponse>;
    signIn(body: SignInDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPISignInResponse>;
    signInWithGoogle(body: GoogleSignInDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPISignInWithGoogleResponse>;
    signUp(body: SignUpDto, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    updateCarpool(id: string, body: UpsertCarpoolDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPIUpdateCarpoolResponse>;
    verifyUser(body: VerificationDto, options?: coreHttp.OperationOptions): Promise<CarpoolAPIVerifyUserResponse>;
}

// @public (undocumented)
export class CarpoolAPIContext extends coreHttp.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, $host: string, options?: CarpoolAPIOptionalParams);
}

// @public
export type CarpoolAPICreateCarpoolResponse = CarpoolDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: CarpoolDto;
    };
};

// @public
export type CarpoolAPICreateDriverResponse = DriverDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DriverDto;
    };
};

// @public
export type CarpoolAPICreatePassengerResponse = PassengerDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: PassengerDto;
    };
};

// @public
export type CarpoolAPIGetCarpoolResponse = CarpoolDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: CarpoolDto;
    };
};

// @public
export type CarpoolAPIGetDriversResponse = DriverDto[] & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DriverDto[];
    };
};

// @public
export type CarpoolAPIGetMyCarpoolsResponse = CarpoolQueryResponseDto[] & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: CarpoolQueryResponseDto[];
    };
};

// @public
export type CarpoolAPIGetMyProfileResponse = UserDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: UserDto;
    };
};

// @public
export type CarpoolAPIGetPassengersResponse = PassengerDto[] & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: PassengerDto[];
    };
};

// @public
export type CarpoolAPIGetUserCarpoolsResponse = CarpoolDto[] & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: CarpoolDto[];
    };
};

// @public
export interface CarpoolAPIOptionalParams extends coreHttp.ServiceClientOptions {
    endpoint?: string;
}

// @public
export type CarpoolAPIResetPasswordResponse = AuthDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: AuthDto;
    };
};

// @public
export type CarpoolAPISignInResponse = AuthDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: AuthDto;
    };
};

// @public
export type CarpoolAPISignInWithGoogleResponse = SocialAuthDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: SocialAuthDto;
    };
};

// @public
export type CarpoolAPIUpdateCarpoolResponse = CarpoolDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: CarpoolDto;
    };
};

// @public
export type CarpoolAPIVerifyUserResponse = AuthDto & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: AuthDto;
    };
};

// @public (undocumented)
export interface CarpoolDto {
    // (undocumented)
    created: Date;
    // (undocumented)
    dateTime: Date;
    // (undocumented)
    description: string;
    // (undocumented)
    destination: string;
    // (undocumented)
    id: string;
    // (undocumented)
    metadata: CarpoolMetadataDto;
    // (undocumented)
    name: string;
    // (undocumented)
    updated: Date;
    // (undocumented)
    urlId: string;
    // (undocumented)
    user: UserDto;
}

// @public (undocumented)
export interface CarpoolMetadataDto {
    // (undocumented)
    driverCount: number;
    // (undocumented)
    seatsRemaining: number;
}

// @public (undocumented)
export interface CarpoolQueryResponseDto {
    // (undocumented)
    carpool: CarpoolDto;
    // (undocumented)
    type: CarpoolQueryResponseDtoType;
}

// @public
export type CarpoolQueryResponseDtoType = "created" | "driving" | "passenger" | string;

// @public
export type CarType = "sedan" | "truck" | "suv" | "van" | string;

// @public (undocumented)
export interface DriverDto {
    // (undocumented)
    car: Car;
    // (undocumented)
    carpoolId: string;
    // (undocumented)
    id: string;
    // (undocumented)
    passengers: PassengerDto[];
    // (undocumented)
    passengerUserIds: string[];
    // (undocumented)
    seatsRemaining: number;
    // (undocumented)
    user: UserDto;
}

// @public (undocumented)
export interface GoogleSignInDto {
    // (undocumented)
    displayName?: string;
    // (undocumented)
    idToken: string;
}

// @public (undocumented)
export interface PassengerDto {
    // (undocumented)
    address: string;
    // (undocumented)
    driverId: string;
    // (undocumented)
    id: string;
    // (undocumented)
    phoneNumber: string;
    // (undocumented)
    user: UserDto;
}

// @public (undocumented)
export interface PasswordResetDto {
    // (undocumented)
    email: string;
    // (undocumented)
    newPassword: string;
    // (undocumented)
    token: string;
}

// @public (undocumented)
export interface PasswordResetRequestDto {
    // (undocumented)
    email: string;
}

// @public (undocumented)
export interface SignInDto {
    // (undocumented)
    email: string;
    // (undocumented)
    password: string;
}

// @public (undocumented)
export interface SignUpDto {
    // (undocumented)
    displayName: string;
    // (undocumented)
    email: string;
    // (undocumented)
    password: string;
}

// @public (undocumented)
export interface SocialAuthDto {
    // (undocumented)
    accessToken: string;
    // (undocumented)
    error: string;
    // (undocumented)
    nextStep: number;
}

// @public (undocumented)
export interface UpsertCarpoolDto {
    // (undocumented)
    carpoolName: string;
    // (undocumented)
    dateTime: Date;
    // (undocumented)
    description?: string;
    // (undocumented)
    destination: string;
}

// @public (undocumented)
export interface UpsertDriverDto {
    // (undocumented)
    car: Car;
}

// @public (undocumented)
export interface UpsertPassengerDto {
    // (undocumented)
    address: string;
    // (undocumented)
    phoneNumber?: string;
}

// @public (undocumented)
export interface UserDto {
    // (undocumented)
    displayName: string;
    // (undocumented)
    email: string;
    // (undocumented)
    id: string;
}

// @public (undocumented)
export interface VerificationDto {
    // (undocumented)
    email: string;
    // (undocumented)
    token: string;
}


// (No @packageDocumentation comment for this package)

```