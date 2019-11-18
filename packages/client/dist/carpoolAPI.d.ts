import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { CarpoolAPIContext } from "./carpoolAPIContext";
declare class CarpoolAPI extends CarpoolAPIContext {
    /**
     * Initializes a new instance of the CarpoolAPI class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    constructor(credentials: msRest.ServiceClientCredentials, options?: Models.CarpoolAPIOptions);
    /**
     * Sign up a new user
     * @summary Sign up
     * @param signUpDto
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    signUp(signUpDto: Models.SignUpDto, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param signUpDto
     * @param callback The callback
     */
    signUp(signUpDto: Models.SignUpDto, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param signUpDto
     * @param options The optional parameters
     * @param callback The callback
     */
    signUp(signUpDto: Models.SignUpDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Sign in an existing user
     * @summary Sign in
     * @param signInDto
     * @param [options] The optional parameters
     * @returns Promise<Models.SignInResponse>
     */
    signIn(signInDto: Models.SignInDto, options?: msRest.RequestOptionsBase): Promise<Models.SignInResponse>;
    /**
     * @param signInDto
     * @param callback The callback
     */
    signIn(signInDto: Models.SignInDto, callback: msRest.ServiceCallback<Models.AuthDto>): void;
    /**
     * @param signInDto
     * @param options The optional parameters
     * @param callback The callback
     */
    signIn(signInDto: Models.SignInDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
    /**
     * Sign in using a google user's idToken. This will create a user if it doesnt exist.
     * @summary Sign in with Google
     * @param googleSignInDto
     * @param [options] The optional parameters
     * @returns Promise<Models.SignInWithGoogleResponse>
     */
    signInWithGoogle(googleSignInDto: Models.GoogleSignInDto, options?: msRest.RequestOptionsBase): Promise<Models.SignInWithGoogleResponse>;
    /**
     * @param googleSignInDto
     * @param callback The callback
     */
    signInWithGoogle(googleSignInDto: Models.GoogleSignInDto, callback: msRest.ServiceCallback<Models.SocialAuthDto>): void;
    /**
     * @param googleSignInDto
     * @param options The optional parameters
     * @param callback The callback
     */
    signInWithGoogle(googleSignInDto: Models.GoogleSignInDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SocialAuthDto>): void;
    /**
     * Sends a password reset to the specified email if it exists
     * @summary Request Password Reset
     * @param passwordResetRequestDto
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    requestPasswordReset(passwordResetRequestDto: Models.PasswordResetRequestDto, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param passwordResetRequestDto
     * @param callback The callback
     */
    requestPasswordReset(passwordResetRequestDto: Models.PasswordResetRequestDto, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param passwordResetRequestDto
     * @param options The optional parameters
     * @param callback The callback
     */
    requestPasswordReset(passwordResetRequestDto: Models.PasswordResetRequestDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Reset a User's password using the token emailed to them after requesting a password reset
     * @summary Reset User Password
     * @param passwordResetDto
     * @param [options] The optional parameters
     * @returns Promise<Models.ResetPasswordResponse>
     */
    resetPassword(passwordResetDto: Models.PasswordResetDto, options?: msRest.RequestOptionsBase): Promise<Models.ResetPasswordResponse>;
    /**
     * @param passwordResetDto
     * @param callback The callback
     */
    resetPassword(passwordResetDto: Models.PasswordResetDto, callback: msRest.ServiceCallback<Models.AuthDto>): void;
    /**
     * @param passwordResetDto
     * @param options The optional parameters
     * @param callback The callback
     */
    resetPassword(passwordResetDto: Models.PasswordResetDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
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
    /**
     * Gets a collection of carpools created by the current user
     * @summary Get user's carpools
     * @param [options] The optional parameters
     * @returns Promise<Models.GetMyCarpoolsResponse>
     */
    getMyCarpools(options?: msRest.RequestOptionsBase): Promise<Models.GetMyCarpoolsResponse>;
    /**
     * @param callback The callback
     */
    getMyCarpools(callback: msRest.ServiceCallback<Models.CarpoolDto[]>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getMyCarpools(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto[]>): void;
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
    /**
     * Create a new Carpool
     * @summary Create Carpool
     * @param upsertCarpoolDto
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateCarpoolResponse>
     */
    createCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, options?: msRest.RequestOptionsBase): Promise<Models.CreateCarpoolResponse>;
    /**
     * @param upsertCarpoolDto
     * @param callback The callback
     */
    createCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
    /**
     * @param upsertCarpoolDto
     * @param options The optional parameters
     * @param callback The callback
     */
    createCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
    /**
     * Retrieve a Carpool by its GUID or its URL ID
     * @summary Get Carpool
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCarpoolResponse>
     */
    getCarpool(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCarpoolResponse>;
    /**
     * @param id
     * @param callback The callback
     */
    getCarpool(id: string, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    getCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
    /**
     * Update a Carpool
     * @summary Update Carpool
     * @param upsertCarpoolDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCarpoolResponse>
     */
    updateCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCarpoolResponse>;
    /**
     * @param upsertCarpoolDto
     * @param id
     * @param callback The callback
     */
    updateCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, id: string, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
    /**
     * @param upsertCarpoolDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCarpool(upsertCarpoolDto: Models.UpsertCarpoolDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolDto>): void;
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
    /**
     * Create a driver for a carpool
     * @summary Create Driver
     * @param upsertDriverDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateDriverResponse>
     */
    createDriver(upsertDriverDto: Models.UpsertDriverDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.CreateDriverResponse>;
    /**
     * @param upsertDriverDto
     * @param id
     * @param callback The callback
     */
    createDriver(upsertDriverDto: Models.UpsertDriverDto, id: string, callback: msRest.ServiceCallback<Models.DriverDto>): void;
    /**
     * @param upsertDriverDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    createDriver(upsertDriverDto: Models.UpsertDriverDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DriverDto>): void;
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
    /**
     * Creates a passenger based off the current user
     * @summary Create Passenger
     * @param upsertPassengerDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.CreatePassengerResponse>
     */
    createPassenger(upsertPassengerDto: Models.UpsertPassengerDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.CreatePassengerResponse>;
    /**
     * @param upsertPassengerDto
     * @param id
     * @param callback The callback
     */
    createPassenger(upsertPassengerDto: Models.UpsertPassengerDto, id: string, callback: msRest.ServiceCallback<Models.PassengerDto>): void;
    /**
     * @param upsertPassengerDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    createPassenger(upsertPassengerDto: Models.UpsertPassengerDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PassengerDto>): void;
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
    /**
     * Verify a User using the token emailed to them during account creation
     * @summary Verify User
     * @param verificationDto
     * @param [options] The optional parameters
     * @returns Promise<Models.VerifyUserResponse>
     */
    verifyUser(verificationDto: Models.VerificationDto, options?: msRest.RequestOptionsBase): Promise<Models.VerifyUserResponse>;
    /**
     * @param verificationDto
     * @param callback The callback
     */
    verifyUser(verificationDto: Models.VerificationDto, callback: msRest.ServiceCallback<Models.AuthDto>): void;
    /**
     * @param verificationDto
     * @param options The optional parameters
     * @param callback The callback
     */
    verifyUser(verificationDto: Models.VerificationDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AuthDto>): void;
}
export { CarpoolAPI, CarpoolAPIContext, Models as CarpoolAPIModels, Mappers as CarpoolAPIMappers };
