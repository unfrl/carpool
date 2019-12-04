import { ApiResponseModelProperty, ApiModelProperty } from "@nestjs/swagger";

import { CarpoolDto } from "./carpool.dto";

export enum CarpoolQueryType {
    created = "created",
    driving = "driving",
    passenger = "passenger",
}

export class CarpoolQueryDto {
    @ApiModelProperty({
        description: "CSV w/ one or more available options: created,driving,passenger",
    })
    public readonly type: string;
}

export class CarpoolQueryResponseDto {
    @ApiResponseModelProperty()
    public carpool: CarpoolDto;

    @ApiModelProperty({ enum: ["created", "driving", "passenger"] })
    public type: CarpoolQueryType;
}
