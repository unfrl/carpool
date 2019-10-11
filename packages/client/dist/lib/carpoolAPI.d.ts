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
     * Create a new Carpool
     * @summary Create Carpool
     * @param carpoolDto
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateCarpoolResponse>
     */
    createCarpool(carpoolDto: Models.CarpoolDto, options?: msRest.RequestOptionsBase): Promise<Models.CreateCarpoolResponse>;
    /**
     * @param carpoolDto
     * @param callback The callback
     */
    createCarpool(carpoolDto: Models.CarpoolDto, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * @param carpoolDto
     * @param options The optional parameters
     * @param callback The callback
     */
    createCarpool(carpoolDto: Models.CarpoolDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * Retrieve a Carpool
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
    getCarpool(id: string, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    getCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * Update a Carpool
     * @summary Update Carpool
     * @param carpoolDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCarpoolResponse>
     */
    updateCarpool(carpoolDto: Models.CarpoolDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCarpoolResponse>;
    /**
     * @param carpoolDto
     * @param id
     * @param callback The callback
     */
    updateCarpool(carpoolDto: Models.CarpoolDto, id: string, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * @param carpoolDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCarpool(carpoolDto: Models.CarpoolDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * Delete a Carpool
     * @summary Delete Carpool
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteCarpoolResponse>
     */
    deleteCarpool(id: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteCarpoolResponse>;
    /**
     * @param id
     * @param callback The callback
     */
    deleteCarpool(id: string, callback: msRest.ServiceCallback<Models.Carpool>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Carpool>): void;
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
    getMyCarpools(callback: msRest.ServiceCallback<Models.Carpool[]>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getMyCarpools(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Carpool[]>): void;
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
