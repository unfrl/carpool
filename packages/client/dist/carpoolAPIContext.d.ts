import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
export declare class CarpoolAPIContext extends msRest.ServiceClient {
    credentials: msRest.ServiceClientCredentials;
    /**
     * Initializes a new instance of the CarpoolAPIContext class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param [options] The parameter options
     */
    constructor(credentials: msRest.ServiceClientCredentials, options?: Models.CarpoolAPIOptions);
}
