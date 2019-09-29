import { ApiModelProperty } from "@nestjs/swagger";

export class Address {
    /**
     * E.g. street name ==> 230 S 500 W
     */
    @ApiModelProperty()
    public name: string;
    /**
     * E.g. state name ==> Utah
     */
    @ApiModelProperty()
    public administrative: string;
    /**
     * E.g. Salt Lake County
     */
    @ApiModelProperty()
    public county?: string;
    /**
     * E.g. Salt Lake City
     */
    @ApiModelProperty()
    public city: string;
    /**
     * E.g. United States of America
     */
    @ApiModelProperty()
    public country: string;
    /**
     * E.g. us
     */
    @ApiModelProperty()
    public countryCode: string;
    /**
     * E.g. 84190
     */
    @ApiModelProperty()
    public postcode: string;

    public latlng?: {
        lat: number;
        lng: number;
    };
}
