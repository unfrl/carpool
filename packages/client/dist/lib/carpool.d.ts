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
}
export { Carpool, CarpoolContext, Models as CarpoolModels, Mappers as CarpoolMappers };
