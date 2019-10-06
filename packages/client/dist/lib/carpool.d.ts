import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { CarpoolContext } from "./carpoolContext";
declare class Carpool extends CarpoolContext {
    /**
     * Initializes a new instance of the Carpool class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    constructor(credentials: msRest.ServiceClientCredentials, options?: Models.CarpoolOptions);
    /**
     * Sign up a new user
     * @summary Sign up
     * @param signUpDto
     * @param [options] The optional parameters
     * @returns Promise<Models.SignUpResponse>
     */
    signUp(signUpDto: Models.SignUpDto, options?: msRest.RequestOptionsBase): Promise<Models.SignUpResponse>;
    /**
     * @param signUpDto
     * @param callback The callback
     */
    signUp(signUpDto: Models.SignUpDto, callback: msRest.ServiceCallback<Models.UserDto>): void;
    /**
     * @param signUpDto
     * @param options The optional parameters
     * @param callback The callback
     */
    signUp(signUpDto: Models.SignUpDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.UserDto>): void;
    /**
     * Sign in an existing user
     * @summary Sign in
     * @param authDto
     * @param [options] The optional parameters
     * @returns Promise<Models.SignInResponse>
     */
    signIn(authDto: Models.AuthDto, options?: msRest.RequestOptionsBase): Promise<Models.SignInResponse>;
    /**
     * @param authDto
     * @param callback The callback
     */
    signIn(authDto: Models.AuthDto, callback: msRest.ServiceCallback<Models.UserDto>): void;
    /**
     * @param authDto
     * @param options The optional parameters
     * @param callback The callback
     */
    signIn(authDto: Models.AuthDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.UserDto>): void;
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
    createCarpool(carpoolDto: Models.CarpoolDto, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param carpoolDto
     * @param options The optional parameters
     * @param callback The callback
     */
    createCarpool(carpoolDto: Models.CarpoolDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
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
    getCarpool(id: string, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    getCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
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
    updateCarpool(carpoolDto: Models.CarpoolDto, id: string, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param carpoolDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCarpool(carpoolDto: Models.CarpoolDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
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
    deleteCarpool(id: string, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCarpool(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
}
export { Carpool, CarpoolContext, Models as CarpoolModels, Mappers as CarpoolMappers };
