export interface Address {
    /**
     * E.g. street name ==> 230 S 500 W
     */
    name: string;
    /**
     * E.g. state name ==> Utah
     */
    administrative: string;
    /**
     * E.g. Salt Lake County
     */
    county?: string;
    /**
     * E.g. Salt Lake City
     */
    city: string;
    /**
     * E.g. United States of America
     */
    country: string;
    /**
     * E.g. us
     */
    countryCode: string;
    /**
     * E.g. 84190
     */
    postcode: string;
    latlng?: {
        lat: number;
        lng: number;
    };
}
