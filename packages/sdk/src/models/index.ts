import * as coreHttp from "@azure/core-http";

export interface SignUpDto {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface AuthDto {
  accessToken: string;
}

export interface GoogleSignInDto {
  idToken: string;
  displayName?: string;
}

export interface SocialAuthDto {
  accessToken: string;
  nextStep: number;
  error: string;
}

export interface PasswordResetRequestDto {
  email: string;
}

export interface PasswordResetDto {
  email: string;
  token: string;
  newPassword: string;
}

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
}

export interface CarpoolQueryResponseDto {
  carpool: CarpoolDto;
  type: CarpoolQueryResponseDtoType;
}

export interface CarpoolDto {
  id: string;
  name: string;
  description: string;
  urlId: string;
  destination: string;
  dateTime: Date;
  created: Date;
  updated: Date;
  user: UserDto;
  metadata: CarpoolMetadataDto;
}

export interface CarpoolMetadataDto {
  seatsRemaining: number;
  driverCount: number;
}

export interface UpsertCarpoolDto {
  carpoolName: string;
  description?: string;
  destination: string;
  dateTime: Date;
}

export interface UpsertDriverDto {
  car: Car;
}

export interface Car {
  capacity: number;
  color: string;
  type: CarType;
}

export interface DriverDto {
  id: string;
  car: Car;
  carpoolId: string;
  user: UserDto;
  seatsRemaining: number;
  passengerUserIds: string[];
  passengers: PassengerDto[];
}

export interface PassengerDto {
  id: string;
  phoneNumber: string;
  address: string;
  user: UserDto;
  driverId: string;
}

export interface UpsertPassengerDto {
  phoneNumber?: string;
  address: string;
}

export interface VerificationDto {
  email: string;
  token: string;
}

/**
 * Defines values for CarpoolQueryResponseDtoType.
 */
export type CarpoolQueryResponseDtoType =
  | "created"
  | "driving"
  | "passenger"
  | string;
/**
 * Defines values for CarType.
 */
export type CarType = "sedan" | "truck" | "suv" | "van" | string;

/**
 * Contains response data for the signIn operation.
 */
export type CarpoolAPISignInResponse = AuthDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPISignInWithGoogleResponse = SocialAuthDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SocialAuthDto;
  };
};

/**
 * Contains response data for the resetPassword operation.
 */
export type CarpoolAPIResetPasswordResponse = AuthDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIGetMyProfileResponse = UserDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIGetMyCarpoolsResponse = CarpoolQueryResponseDto[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CarpoolQueryResponseDto[];
  };
};

/**
 * Contains response data for the getUserCarpools operation.
 */
export type CarpoolAPIGetUserCarpoolsResponse = CarpoolDto[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPICreateCarpoolResponse = CarpoolDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIGetCarpoolResponse = CarpoolDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIUpdateCarpoolResponse = CarpoolDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPICreateDriverResponse = DriverDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIGetDriversResponse = DriverDto[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPICreatePassengerResponse = PassengerDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIGetPassengersResponse = PassengerDto[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
export type CarpoolAPIVerifyUserResponse = AuthDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
 * Optional parameters.
 */
export interface CarpoolAPIOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
