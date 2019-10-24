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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as shortid from "shortid";

import { UpsertCarpoolDto, CarpoolDto } from "../dtos";
import { CarpoolService } from "../services";
import { CarpoolGateway } from "../gateways";
import { UserRequest } from "../interfaces";
import { CarpoolModificationGuard } from "../guards";

@ApiUseTags("Carpools")
@ApiBearerAuth()
@Controller("api/v1/carpools")
export class CarpoolController {
    public constructor(
        private readonly _carpoolService: CarpoolService,
        private readonly _carpoolGateway: CarpoolGateway
    ) {}

    @ApiOperation({
        operationId: "createCarpool",
        title: "Create Carpool",
        description: "Create a new Carpool",
    })
    @ApiCreatedResponse({ type: CarpoolDto })
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
    public async getById(@Param("id") id: string): Promise<CarpoolDto> {
        // Allowing GET to be by their GUID or their URL ID
        if (shortid.isValid(id)) {
            return await this._carpoolService.findCarpoolByUrlId(id);
        } else {
            return await this._carpoolService.findCarpoolById(id);
        }
    }

    @ApiOperation({
        operationId: "updateCarpool",
        title: "Update Carpool",
        description: "Update a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto })
    @UseGuards(AuthGuard("jwt"), CarpoolModificationGuard)
    @Put(":id")
    public async updateCarpool(
        @Param("id") id: string,
        @Req() request: UserRequest,
        @Body() carpoolDto: UpsertCarpoolDto
    ): Promise<CarpoolDto> {
        const carpool = await this._carpoolService.updateCarpool(id, carpoolDto, request.user.id);

        // TODO: don't use gateway directly, move logic to an interceptor (https://docs.nestjs.com/interceptors) or via pub/sub
        this._carpoolGateway.emitCarpoolUpdated(carpool);

        return carpool;
    }

    @ApiOperation({
        operationId: "deleteCarpool",
        title: "Delete Carpool",
        description: "Delete a Carpool",
    })
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @UseGuards(AuthGuard("jwt"), CarpoolModificationGuard)
    @Delete(":id")
    public async deleteCarpool(@Param("id") id: string): Promise<void> {
        await this._carpoolService.deleteCarpool(id);
    }
}
