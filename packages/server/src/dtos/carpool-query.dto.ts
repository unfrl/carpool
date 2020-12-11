import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

import { CarpoolDto } from "./carpool.dto";

export enum CarpoolQueryType {
    created = "created",
    driving = "driving",
    passenger = "passenger",
}

export class CarpoolQueryDto {
    @ApiProperty({
        description: "CSV w/ one or more available options: created,driving,passenger",
    })
    public readonly type: string;
}

export class CarpoolQueryResponseDto {
    @ApiResponseProperty()
    public carpool: CarpoolDto;

    @ApiProperty({ enum: ["created", "driving", "passenger"] })
    public type: CarpoolQueryType;
}
