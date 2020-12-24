/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { CarpoolAPIContext } from "./carpoolAPIContext";

class CarpoolAPI extends CarpoolAPIContext {
  /**
   * Initializes a new instance of the CarpoolAPI class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials, options?: Models.CarpoolAPIOptions) {
    super(credentials, options);
  }

  /**
   * Sign up a new user
   * @summary Sign up
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  signUp(body: Models.SignUpDto, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  signUp(body: Models.SignUpDto, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  signUp(body: Models.SignUpDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  signUp(body: Models.SignUpDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      signUpOperationSpec,
      callback);
  }

  /**
   * Sign in an existing user
   * @summary Sign in
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<Models.SignInResponse>
   */
  signIn(body: Models.SignInDto, options?: msRest.RequestOptionsBase): Promise<Models.SignInResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  signIn(body: Models.SignInDto, callback: msRest.ServiceCallback<Models.AuthDto>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  signIn(body: Models.SignInDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
  signIn(body: Models.SignInDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AuthDto>, callback?: msRest.ServiceCallback<Models.AuthDto>): Promise<Models.SignInResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      signInOperationSpec,
      callback) as Promise<Models.SignInResponse>;
  }

  /**
   * Sign in using a google user's idToken. This will create a user if it doesnt exist. It might also
   * request further steps, such as setting a display name.
   * @summary Sign in with Google
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<Models.SignInWithGoogleResponse>
   */
  signInWithGoogle(body: Models.GoogleSignInDto, options?: msRest.RequestOptionsBase): Promise<Models.SignInWithGoogleResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  signInWithGoogle(body: Models.GoogleSignInDto, callback: msRest.ServiceCallback<Models.SocialAuthDto>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  signInWithGoogle(body: Models.GoogleSignInDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SocialAuthDto>): void;
  signInWithGoogle(body: Models.GoogleSignInDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.SocialAuthDto>, callback?: msRest.ServiceCallback<Models.SocialAuthDto>): Promise<Models.SignInWithGoogleResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      signInWithGoogleOperationSpec,
      callback) as Promise<Models.SignInWithGoogleResponse>;
  }

  /**
   * Sends a password reset to the specified email if it exists
   * @summary Request Password Reset
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  requestPasswordReset(body: Models.PasswordResetRequestDto, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  requestPasswordReset(body: Models.PasswordResetRequestDto, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  requestPasswordReset(body: Models.PasswordResetRequestDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  requestPasswordReset(body: Models.PasswordResetRequestDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      requestPasswordResetOperationSpec,
      callback);
  }

  /**
   * Reset a User's password using the token emailed to them after requesting a password reset
   * @summary Reset User Password
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<Models.ResetPasswordResponse>
   */
  resetPassword(body: Models.PasswordResetDto, options?: msRest.RequestOptionsBase): Promise<Models.ResetPasswordResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  resetPassword(body: Models.PasswordResetDto, callback: msRest.ServiceCallback<Models.AuthDto>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  resetPassword(body: Models.PasswordResetDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
  resetPassword(body: Models.PasswordResetDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AuthDto>, callback?: msRest.ServiceCallback<Models.AuthDto>): Promise<Models.ResetPasswordResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      resetPasswordOperationSpec,
      callback) as Promise<Models.ResetPasswordResponse>;
  }

  /**
   * Gets the current user's profile
   * @summary Get user profile
   * @param [options] The optional parameters
   * @returns Promise<Models.GetMyProfileResponse>
   */
  getMyProfile(options?: msRest.RequestOptionsBase): Promise<Models.GetMyProfileResponse>;
  /**
   * @param callback The callback
   */
  getMyProfile(callback: msRest.ServiceCallback<Models.UserDto>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getMyProfile(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.UserDto>): void;
  getMyProfile(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.UserDto>, callback?: msRest.ServiceCallback<Models.UserDto>): Promise<Models.GetMyProfileResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getMyProfileOperationSpec,
      callback) as Promise<Models.GetMyProfileResponse>;
  }

  /**
   * Gets a collection of carpools created by the current user
   * @summary Get user's carpools
   * @param type CSV w/ one or more available options: created,driving,passenger
   * @param [options] The optional parameters
   * @returns Promise<Models.GetMyCarpoolsResponse>
   */
  getMyCarpools(type: string, options?: msRest.RequestOptionsBase): Promise<Models.GetMyCarpoolsResponse>;
  /**
   * @param type CSV w/ one or more available options: created,driving,passenger
   * @param callback The callback
   */
  getMyCarpools(type: string, callback: msRest.ServiceCallback<Models.CarpoolQueryResponseDto[]>): void;
  /**
   * @param type CSV w/ one or more available options: created,driving,passenger
   * @param options The optional parameters
   * @param callback The callback
   */
  getMyCarpools(type: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolQueryResponseDto[]>): void;
  getMyCarpools(type: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CarpoolQueryResponseDto[]>, callback?: msRest.ServiceCallback<Models.CarpoolQueryResponseDto[]>): Promise<Models.GetMyCarpoolsResponse> {
    return this.sendOperationRequest(
      {
        type,
        options
      },
      getMyCarpoolsOperationSpec,
      callback) as Promise<Models.GetMyCarpoolsResponse>;
  }

  /**
   * Get a user's carpools by their display name
   * @summary Get a user's carpools
   * @param displayName
   * @param [options] The optional parameters
   * @returns Promise<Models.GetUserCarpoolsResponse>
   */
  getUserCarpools(displayName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetUserCarpoolsResponse>;
  /**
   * @param displayName
   * @param callback The callback
   */
  getUserCarpools(displayName: string, callback: msRest.ServiceCallback<Models.CarpoolDto[]>): void;
  /**
   * @param displayName
   * @param options The optional parameters
   * @param callback The callback
   */
  getUserCarpools(displayName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto[]>): void;
  getUserCarpools(displayName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CarpoolDto[]>, callback?: msRest.ServiceCallback<Models.CarpoolDto[]>): Promise<Models.GetUserCarpoolsResponse> {
    return this.sendOperationRequest(
      {
        displayName,
        options
      },
      getUserCarpoolsOperationSpec,
      callback) as Promise<Models.GetUserCarpoolsResponse>;
  }

  /**
   * Create a new Carpool
   * @summary Create Carpool
   * @param body
   * @param [options] The optional parameters
   * @returns Promise<Models.CreateCarpoolResponse>
   */
  createCarpool(body: Models.UpsertCarpoolDto, options?: msRest.RequestOptionsBase): Promise<Models.CreateCarpoolResponse>;
  /**
   * @param body
   * @param callback The callback
   */
  createCarpool(body: Models.UpsertCarpoolDto, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  /**
   * @param body
   * @param options The optional parameters
   * @param callback The callback
   */
  createCarpool(body: Models.UpsertCarpoolDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  createCarpool(body: Models.UpsertCarpoolDto, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CarpoolDto>, callback?: msRest.ServiceCallback<Models.CarpoolDto>): Promise<Models.CreateCarpoolResponse> {
    return this.sendOperationRequest(
      {
        body,
        options
      },
      createCarpoolOperationSpec,
      callback) as Promise<Models.CreateCarpoolResponse>;
  }

  /**
   * Retrieve a Carpool by its GUID or its URL ID
   * @summary Get Carpool
   * @param id
   * @param includeMetadata
   * @param [options] The optional parameters
   * @returns Promise<Models.GetCarpoolResponse>
   */
  getCarpool(id: string, includeMetadata: boolean, options?: msRest.RequestOptionsBase): Promise<Models.GetCarpoolResponse>;
  /**
   * @param id
   * @param includeMetadata
   * @param callback The callback
   */
  getCarpool(id: string, includeMetadata: boolean, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  /**
   * @param id
   * @param includeMetadata
   * @param options The optional parameters
   * @param callback The callback
   */
  getCarpool(id: string, includeMetadata: boolean, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  getCarpool(id: string, includeMetadata: boolean, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CarpoolDto>, callback?: msRest.ServiceCallback<Models.CarpoolDto>): Promise<Models.GetCarpoolResponse> {
    return this.sendOperationRequest(
      {
        id,
        includeMetadata,
        options
      },
      getCarpoolOperationSpec,
      callback) as Promise<Models.GetCarpoolResponse>;
  }

  /**
   * Update a Carpool
   * @summary Update Carpool
   * @param body
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateCarpoolResponse>
   */
  updateCarpool(body: Models.UpsertCarpoolDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCarpoolResponse>;
  /**
   * @param body
   * @param id
   * @param callback The callback
   */
  updateCarpool(body: Models.UpsertCarpoolDto, id: string, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  /**
   * @param body
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  updateCarpool(body: Models.UpsertCarpoolDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
  updateCarpool(body: Models.UpsertCarpoolDto, id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CarpoolDto>, callback?: msRest.ServiceCallback<Models.CarpoolDto>): Promise<Models.UpdateCarpoolResponse> {
    return this.sendOperationRequest(
      {
        body,
        id,
        options
      },
      updateCarpoolOperationSpec,
      callback) as Promise<Models.UpdateCarpoolResponse>;
  }

  /**
   * Delete a Carpool
   * @summary Delete Carpool
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteCarpool(id: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  deleteCarpool(id: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteCarpool(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      deleteCarpoolOperationSpec,
      callback);
  }

  /**
   * Create a driver for a carpool
   * @summary Create Driver
   * @param body
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.CreateDriverResponse>
   */
  createDriver(body: Models.UpsertDriverDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.CreateDriverResponse>;
  /**
   * @param body
   * @param id
   * @param callback The callback
   */
  createDriver(body: Models.UpsertDriverDto, id: string, callback: msRest.ServiceCallback<Models.DriverDto>): void;
  /**
   * @param body
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  createDriver(body: Models.UpsertDriverDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DriverDto>): void;
  createDriver(body: Models.UpsertDriverDto, id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DriverDto>, callback?: msRest.ServiceCallback<Models.DriverDto>): Promise<Models.CreateDriverResponse> {
    return this.sendOperationRequest(
      {
        body,
        id,
        options
      },
      createDriverOperationSpec,
      callback) as Promise<Models.CreateDriverResponse>;
  }

  /**
   * Get all the drivers signed up for a carpool
   * @summary Get Drivers
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.GetDriversResponse>
   */
  getDrivers(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDriversResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  getDrivers(id: string, callback: msRest.ServiceCallback<Models.DriverDto[]>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  getDrivers(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DriverDto[]>): void;
  getDrivers(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DriverDto[]>, callback?: msRest.ServiceCallback<Models.DriverDto[]>): Promise<Models.GetDriversResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      getDriversOperationSpec,
      callback) as Promise<Models.GetDriversResponse>;
  }

  /**
   * Delete the specified driver, email any of their passengers
   * @summary Delete Driver
   * @param id
   * @param driverId
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteDriver(id: string, driverId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param id
   * @param driverId
   * @param callback The callback
   */
  deleteDriver(id: string, driverId: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param id
   * @param driverId
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteDriver(id: string, driverId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteDriver(id: string, driverId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        id,
        driverId,
        options
      },
      deleteDriverOperationSpec,
      callback);
  }

  /**
   * Creates a passenger based off the current user
   * @summary Create Passenger
   * @param body
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.CreatePassengerResponse>
   */
  createPassenger(body: Models.UpsertPassengerDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.CreatePassengerResponse>;
  /**
   * @param body
   * @param id
   * @param callback The callback
   */
  createPassenger(body: Models.UpsertPassengerDto, id: string, callback: msRest.ServiceCallback<Models.PassengerDto>): void;
  /**
   * @param body
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  createPassenger(body: Models.UpsertPassengerDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PassengerDto>): void;
  createPassenger(body: Models.UpsertPassengerDto, id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.PassengerDto>, callback?: msRest.ServiceCallback<Models.PassengerDto>): Promise<Models.CreatePassengerResponse> {
    return this.sendOperationRequest(
      {
        body,
        id,
        options
      },
      createPassengerOperationSpec,
      callback) as Promise<Models.CreatePassengerResponse>;
  }

  /**
   * Deletes a passenger based off the current user
   * @summary Delete Passenger
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deletePassenger(id: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  deletePassenger(id: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  deletePassenger(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deletePassenger(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      deletePassengerOperationSpec,
      callback);
  }

  /**
   * Get passengers for a driver
   * @summary Get Passengers
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.GetPassengersResponse>
   */
  getPassengers(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetPassengersResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  getPassengers(id: string, callback: msRest.ServiceCallback<Models.PassengerDto[]>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  getPassengers(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PassengerDto[]>): void;
  getPassengers(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.PassengerDto[]>, callback?: msRest.ServiceCallback<Models.PassengerDto[]>): Promise<Models.GetPassengersResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      getPassengersOperationSpec,
      callback) as Promise<Models.GetPassengersResponse>;
  }

  /**
   * Verify a User using the token emailed to them during account creation
   * @summary Verify User
   * @param [options] The optional parameters
   * @returns Promise<Models.VerifyUserResponse>
   */
  verifyUser(options?: msRest.RequestOptionsBase): Promise<Models.VerifyUserResponse>;
  /**
   * @param callback The callback
   */
  verifyUser(callback: msRest.ServiceCallback<Models.AuthDto>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  verifyUser(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
  verifyUser(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AuthDto>, callback?: msRest.ServiceCallback<Models.AuthDto>): Promise<Models.VerifyUserResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      verifyUserOperationSpec,
      callback) as Promise<Models.VerifyUserResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const signUpOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/auth/signup",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.SignUpDto,
      required: true
    }
  },
  responses: {
    200: {},
    default: {}
  },
  serializer
};

const signInOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/auth/signin",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.SignInDto,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    },
    default: {}
  },
  serializer
};

const signInWithGoogleOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/auth/signinwithgoogle",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.GoogleSignInDto,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.SocialAuthDto
    },
    default: {}
  },
  serializer
};

const requestPasswordResetOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/auth/requestpasswordreset",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.PasswordResetRequestDto,
      required: true
    }
  },
  responses: {
    200: {},
    default: {}
  },
  serializer
};

const resetPasswordOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "api/v1/auth/resetpassword",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.PasswordResetDto,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    },
    default: {}
  },
  serializer
};

const getMyProfileOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/users/me",
  responses: {
    200: {
      bodyMapper: Mappers.UserDto
    },
    default: {}
  },
  serializer
};

const getMyCarpoolsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/users/me/carpools",
  queryParameters: [
    Parameters.type
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CarpoolQueryResponseDto"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const getUserCarpoolsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/users/{displayName}/carpools",
  urlParameters: [
    Parameters.displayName
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CarpoolDto"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const createCarpoolOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/carpools",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.UpsertCarpoolDto,
      required: true
    }
  },
  responses: {
    201: {
      bodyMapper: Mappers.CarpoolDto
    },
    default: {}
  },
  serializer
};

const getCarpoolOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/carpools/{id}",
  urlParameters: [
    Parameters.id
  ],
  queryParameters: [
    Parameters.includeMetadata
  ],
  responses: {
    200: {
      bodyMapper: Mappers.CarpoolDto
    },
    default: {}
  },
  serializer
};

const updateCarpoolOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "api/v1/carpools/{id}",
  urlParameters: [
    Parameters.id
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.UpsertCarpoolDto,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.CarpoolDto
    },
    default: {}
  },
  serializer
};

const deleteCarpoolOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "api/v1/carpools/{id}",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    204: {},
    default: {}
  },
  serializer
};

const createDriverOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/carpools/{id}/drivers",
  urlParameters: [
    Parameters.id
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.UpsertDriverDto,
      required: true
    }
  },
  responses: {
    201: {
      bodyMapper: Mappers.DriverDto
    },
    default: {}
  },
  serializer
};

const getDriversOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/carpools/{id}/drivers",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DriverDto"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const deleteDriverOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "api/v1/carpools/{id}/drivers/{driverId}",
  urlParameters: [
    Parameters.id,
    Parameters.driverId
  ],
  responses: {
    204: {},
    default: {}
  },
  serializer
};

const createPassengerOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/v1/drivers/{id}/passengers",
  urlParameters: [
    Parameters.id
  ],
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.UpsertPassengerDto,
      required: true
    }
  },
  responses: {
    201: {
      bodyMapper: Mappers.PassengerDto
    },
    default: {}
  },
  serializer
};

const deletePassengerOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "api/v1/drivers/{id}/passengers",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    204: {},
    default: {}
  },
  serializer
};

const getPassengersOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/v1/drivers/{id}/passengers",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PassengerDto"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const verifyUserOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "api/v1/verification",
  requestBody: {
    parameterPath: "body",
    mapper: {
      ...Mappers.VerificationDto,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    },
    default: {}
  },
  serializer
};

export {
  CarpoolAPI,
  CarpoolAPIContext,
  Models as CarpoolAPIModels,
  Mappers as CarpoolAPIMappers
};
