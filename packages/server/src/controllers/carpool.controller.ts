import {
    ApiOperation,
    ApiUseTags,
    ApiResponse,
    ApiCreatedResponse,
    ApiBearerAuth,
} from "@nestjs/swagger";
import {
    Post,
    Put,
    HttpStatus,
    Body,
    Controller,
    Param,
    Delete,
    Get,
    UseGuards,
    Req,
    UseInterceptors,
    Query,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as shortid from "shortid";

import { UpsertCarpoolDto, CarpoolDto } from "../dtos";
import { CarpoolService } from "../services";
import { UserRequest } from "../interfaces";
import { CarpoolModificationGuard } from "../guards";
import { CarpoolUpdateInterceptor } from "src/interceptors";

@ApiUseTags("Carpools")
@Controller("api/v1/carpools")
export class CarpoolController {
    public constructor(private readonly _carpoolService: CarpoolService) {}

    @ApiOperation({
        operationId: "createCarpool",
        title: "Create Carpool",
        description: "Create a new Carpool",
    })
    @ApiCreatedResponse({ type: CarpoolDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createCarpool(
        @Req() request: UserRequest,
        @Body() carpoolDto: UpsertCarpoolDto
    ): Promise<CarpoolDto> {
        return await this._carpoolService.createCarpool(carpoolDto, request.user);
    }

    @ApiOperation({
        operationId: "getCarpool",
        title: "Get Carpool",
        description: "Retrieve a Carpool by its GUID or its URL ID",
    })
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto })
    @Get(":id")
    public async getById(
        @Param("id") id: string,
        @Query("includeMetadata") includeMetadata: boolean = false
    ): Promise<CarpoolDto> {
        // Allowing GET to be by their GUID or their URL ID
        if (id.length < 14 && shortid.isValid(id)) {
            return await this._carpoolService.findCarpoolByUrlId(id, includeMetadata);
        } else {
            return await this._carpoolService.findCarpoolById(id, includeMetadata);
        }
    }

    @ApiOperation({
        operationId: "updateCarpool",
        title: "Update Carpool",
        description: "Update a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"), CarpoolModificationGuard)
    @UseInterceptors(CarpoolUpdateInterceptor)
    @Put(":id")
    public async updateCarpool(
        @Param("id") id: string,
        @Req() request: UserRequest,
        @Body() carpoolDto: UpsertCarpoolDto
    ): Promise<CarpoolDto> {
        return await this._carpoolService.updateCarpool(id, carpoolDto, request.user);
    }

    @ApiOperation({
        operationId: "deleteCarpool",
        title: "Delete Carpool",
        description: "Delete a Carpool",
    })
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"), CarpoolModificationGuard)
    @Delete(":id")
    public async deleteCarpool(@Param("id") id: string): Promise<void> {
        await this._carpoolService.deleteCarpool(id);
    }
}
