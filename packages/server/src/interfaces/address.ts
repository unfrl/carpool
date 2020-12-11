import { ApiProperty } from "@nestjs/swagger";

export class Address {
    /**
     * E.g. street name ==> 230 S 500 W
     */
    @ApiProperty()
    public name: string;
    /**
     * E.g. state name ==> Utah
     */
    @ApiProperty()
    public administrative: string;
    /**
     * E.g. Salt Lake County
     */
    @ApiProperty()
    public county?: string;
    /**
     * E.g. Salt Lake City
     */
    @ApiProperty()
    public city: string;
    /**
     * E.g. United States of America
     */
    @ApiProperty()
    public country: string;
    /**
     * E.g. us
     */
    @ApiProperty()
    public countryCode: string;
    /**
     * E.g. 84190
     */
    @ApiProperty()
    public postcode: string;

    public latlng?: {
        lat: number;
        lng: number;
    };
}
