import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { CarpoolAPIContext } from "./carpoolAPIContext";
import {
  CarpoolAPIOptionalParams,
  SignUpDto,
  SignInDto,
  CarpoolAPISignInResponse,
  GoogleSignInDto,
  CarpoolAPISignInWithGoogleResponse,
  PasswordResetRequestDto,
  PasswordResetDto,
  CarpoolAPIResetPasswordResponse,
  CarpoolAPIGetMyProfileResponse,
  CarpoolAPIGetMyCarpoolsResponse,
  CarpoolAPIGetUserCarpoolsResponse,
  UpsertCarpoolDto,
  CarpoolAPICreateCarpoolResponse,
  CarpoolAPIGetCarpoolResponse,
  CarpoolAPIUpdateCarpoolResponse,
  UpsertDriverDto,
  CarpoolAPICreateDriverResponse,
  CarpoolAPIGetDriversResponse,
  UpsertPassengerDto,
  CarpoolAPICreatePassengerResponse,
  CarpoolAPIGetPassengersResponse,
  VerificationDto,
  CarpoolAPIVerifyUserResponse
} from "./models";

export class CarpoolAPI extends CarpoolAPIContext {
  /**
   * Initializes a new instance of the CarpoolAPI class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    $host: string,
    options?: CarpoolAPIOptionalParams
  ) {
    super(credentials, $host, options);
  }

  /**
   * Sign up a new user
   * @param body
   * @param options The options parameters.
   */
  signUp(
    body: SignUpDto,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      signUpOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Sign in an existing user
   * @param body
   * @param options The options parameters.
   */
  signIn(
    body: SignInDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPISignInResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      signInOperationSpec
    ) as Promise<CarpoolAPISignInResponse>;
  }

  /**
   * Sign in using a google user's idToken. This will create a user if it doesnt exist. It might also
   * request further steps, such as setting a display name.
   * @param body
   * @param options The options parameters.
   */
  signInWithGoogle(
    body: GoogleSignInDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPISignInWithGoogleResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      signInWithGoogleOperationSpec
    ) as Promise<CarpoolAPISignInWithGoogleResponse>;
  }

  /**
   * Sends a password reset to the specified email if it exists
   * @param body
   * @param options The options parameters.
   */
  requestPasswordReset(
    body: PasswordResetRequestDto,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      requestPasswordResetOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Reset a User's password using the token emailed to them after requesting a password reset
   * @param body
   * @param options The options parameters.
   */
  resetPassword(
    body: PasswordResetDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIResetPasswordResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      resetPasswordOperationSpec
    ) as Promise<CarpoolAPIResetPasswordResponse>;
  }

  /**
   * Gets the current user's profile
   * @param options The options parameters.
   */
  getMyProfile(
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetMyProfileResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getMyProfileOperationSpec
    ) as Promise<CarpoolAPIGetMyProfileResponse>;
  }

  /**
   * Gets a collection of carpools created by the current user
   * @param typeParam CSV w/ one or more available options: created,driving,passenger
   * @param options The options parameters.
   */
  getMyCarpools(
    typeParam: string,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetMyCarpoolsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { typeParam, options: operationOptions },
      getMyCarpoolsOperationSpec
    ) as Promise<CarpoolAPIGetMyCarpoolsResponse>;
  }

  /**
   * Get a user's carpools by their display name
   * @param displayName
   * @param options The options parameters.
   */
  getUserCarpools(
    displayName: string,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetUserCarpoolsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { displayName, options: operationOptions },
      getUserCarpoolsOperationSpec
    ) as Promise<CarpoolAPIGetUserCarpoolsResponse>;
  }

  /**
   * Create a new Carpool
   * @param body
   * @param options The options parameters.
   */
  createCarpool(
    body: UpsertCarpoolDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPICreateCarpoolResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      createCarpoolOperationSpec
    ) as Promise<CarpoolAPICreateCarpoolResponse>;
  }

  /**
   * Retrieve a Carpool by its GUID or its URL ID
   * @param id
   * @param includeMetadata
   * @param options The options parameters.
   */
  getCarpool(
    id: string,
    includeMetadata: boolean,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetCarpoolResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, includeMetadata, options: operationOptions },
      getCarpoolOperationSpec
    ) as Promise<CarpoolAPIGetCarpoolResponse>;
  }

  /**
   * Update a Carpool
   * @param id
   * @param body
   * @param options The options parameters.
   */
  updateCarpool(
    id: string,
    body: UpsertCarpoolDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIUpdateCarpoolResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, body, options: operationOptions },
      updateCarpoolOperationSpec
    ) as Promise<CarpoolAPIUpdateCarpoolResponse>;
  }

  /**
   * Delete a Carpool
   * @param id
   * @param options The options parameters.
   */
  deleteCarpool(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      deleteCarpoolOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Create a driver for a carpool
   * @param id
   * @param body
   * @param options The options parameters.
   */
  createDriver(
    id: string,
    body: UpsertDriverDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPICreateDriverResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, body, options: operationOptions },
      createDriverOperationSpec
    ) as Promise<CarpoolAPICreateDriverResponse>;
  }

  /**
   * Get all the drivers signed up for a carpool
   * @param id
   * @param options The options parameters.
   */
  getDrivers(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetDriversResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      getDriversOperationSpec
    ) as Promise<CarpoolAPIGetDriversResponse>;
  }

  /**
   * Creates a passenger based off the current user
   * @param id
   * @param body
   * @param options The options parameters.
   */
  createPassenger(
    id: string,
    body: UpsertPassengerDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPICreatePassengerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, body, options: operationOptions },
      createPassengerOperationSpec
    ) as Promise<CarpoolAPICreatePassengerResponse>;
  }

  /**
   * Deletes a passenger based off the current user
   * @param id
   * @param options The options parameters.
   */
  deletePassenger(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      deletePassengerOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get passengers for a driver
   * @param id
   * @param options The options parameters.
   */
  getPassengers(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIGetPassengersResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      getPassengersOperationSpec
    ) as Promise<CarpoolAPIGetPassengersResponse>;
  }

  /**
   * Verify a User using the token emailed to them during account creation
   * @param body
   * @param options The options parameters.
   */
  verifyUser(
    body: VerificationDto,
    options?: coreHttp.OperationOptions
  ): Promise<CarpoolAPIVerifyUserResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      verifyUserOperationSpec
    ) as Promise<CarpoolAPIVerifyUserResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const signUpOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/auth/signup",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const signInOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/auth/signin",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    }
  },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const signInWithGoogleOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/auth/signinwithgoogle",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SocialAuthDto
    }
  },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const requestPasswordResetOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/auth/requestpasswordreset",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const resetPasswordOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/auth/resetpassword",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    }
  },
  requestBody: Parameters.body4,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getMyProfileOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/users/me",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UserDto
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept1],
  serializer
};
const getMyCarpoolsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/users/me/carpools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "CarpoolQueryResponseDto" }
          }
        }
      }
    }
  },
  queryParameters: [Parameters.typeParam],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept1],
  serializer
};
const getUserCarpoolsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/users/{displayName}/carpools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "CarpoolDto" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host, Parameters.displayName],
  headerParameters: [Parameters.accept1],
  serializer
};
const createCarpoolOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.CarpoolDto
    }
  },
  requestBody: Parameters.body5,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getCarpoolOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools/{id}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CarpoolDto
    }
  },
  queryParameters: [Parameters.includeMetadata],
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept1],
  serializer
};
const updateCarpoolOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools/{id}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.CarpoolDto
    }
  },
  requestBody: Parameters.body5,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteCarpoolOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools/{id}",
  httpMethod: "DELETE",
  responses: { 204: {} },
  urlParameters: [Parameters.$host, Parameters.id],
  serializer
};
const createDriverOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools/{id}/drivers",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.DriverDto
    }
  },
  requestBody: Parameters.body6,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getDriversOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/carpools/{id}/drivers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DriverDto" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept1],
  serializer
};
const createPassengerOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/drivers/{id}/passengers",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.PassengerDto
    }
  },
  requestBody: Parameters.body7,
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deletePassengerOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/drivers/{id}/passengers",
  httpMethod: "DELETE",
  responses: { 204: {} },
  urlParameters: [Parameters.$host, Parameters.id],
  serializer
};
const getPassengersOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/drivers/{id}/passengers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "PassengerDto" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept1],
  serializer
};
const verifyUserOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/verification",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    }
  },
  requestBody: Parameters.body8,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
