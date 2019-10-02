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
     * Create a new Event
     * @summary Create Event
     * @param createEventDto
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateEventResponse>
     */
    createEvent(createEventDto: Models.CreateEventDto, options?: msRest.RequestOptionsBase): Promise<Models.CreateEventResponse>;
    /**
     * @param createEventDto
     * @param callback The callback
     */
    createEvent(createEventDto: Models.CreateEventDto, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * @param createEventDto
     * @param options The optional parameters
     * @param callback The callback
     */
    createEvent(createEventDto: Models.CreateEventDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * Update an Event
     * @summary Update Event
     * @param updateEventDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateEventResponse>
     */
    updateEvent(updateEventDto: Models.UpdateEventDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.UpdateEventResponse>;
    /**
     * @param updateEventDto
     * @param id
     * @param callback The callback
     */
    updateEvent(updateEventDto: Models.UpdateEventDto, id: string, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * @param updateEventDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    updateEvent(updateEventDto: Models.UpdateEventDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * Retrieve an Event
     * @summary Get Event
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.GetEventResponse>
     */
    getEvent(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetEventResponse>;
    /**
     * @param id
     * @param callback The callback
     */
    getEvent(id: string, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    getEvent(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * Delete an Event
     * @summary Delete Event
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteEventResponse>
     */
    deleteEvent(id: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteEventResponse>;
    /**
     * @param id
     * @param callback The callback
     */
    deleteEvent(id: string, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteEvent(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Event>): void;
    /**
     * Create a new Carpool
     * @summary Create Carpool
     * @param createCarpoolDto
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateCarpoolResponse>
     */
    createCarpool(createCarpoolDto: Models.CreateCarpoolDto, options?: msRest.RequestOptionsBase): Promise<Models.CreateCarpoolResponse>;
    /**
     * @param createCarpoolDto
     * @param callback The callback
     */
    createCarpool(createCarpoolDto: Models.CreateCarpoolDto, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param createCarpoolDto
     * @param options The optional parameters
     * @param callback The callback
     */
    createCarpool(createCarpoolDto: Models.CreateCarpoolDto, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
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
     * @param updateCarpoolDto
     * @param id
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCarpoolResponse>
     */
    updateCarpool(updateCarpoolDto: Models.UpdateCarpoolDto, id: string, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCarpoolResponse>;
    /**
     * @param updateCarpoolDto
     * @param id
     * @param callback The callback
     */
    updateCarpool(updateCarpoolDto: Models.UpdateCarpoolDto, id: string, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
    /**
     * @param updateCarpoolDto
     * @param id
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCarpool(updateCarpoolDto: Models.UpdateCarpoolDto, id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CarpoolModel>): void;
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
