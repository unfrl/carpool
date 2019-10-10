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

import { Carpool } from "../entities";
import { CarpoolDto } from "../dtos";
import { CarpoolService } from "../services";
import { UserRequest } from "../interfaces";

@ApiUseTags("Carpool")
@ApiBearerAuth()
@Controller("api/v1/carpool")
export class CarpoolController {
    public constructor(private readonly _carpoolService: CarpoolService) {}

    @ApiOperation({
        operationId: "createCarpool",
        title: "Create Carpool",
        description: "Create a new Carpool",
    })
    @ApiCreatedResponse({ type: Carpool })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createCarpool(
        @Req() request: UserRequest,
        @Body() carpoolDto: CarpoolDto
    ): Promise<Carpool> {
        return await this._carpoolService.createCarpool(carpoolDto, request.user.id);
    }

    @ApiOperation({
        operationId: "getCarpool",
        title: "Get Carpool",
        description: "Retrieve a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @Get(":id")
    public async getBydId(@Param("id") id: string): Promise<Carpool> {
        return await this._carpoolService.findOneById(id);
    }

    @ApiOperation({
        operationId: "updateCarpool",
        title: "Update Carpool",
        description: "Update a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @UseGuards(AuthGuard("jwt"))
    @Put(":id")
    public async updateCarpool(
        @Param("id") id: string,
        @Req() request: UserRequest,
        @Body() carpoolDto: CarpoolDto
    ): Promise<Carpool> {
        return await this._carpoolService.updateCarpool(id, carpoolDto, request.user.id);
    }

    @ApiOperation({
        operationId: "deleteCarpool",
        title: "Delete Carpool",
        description: "Delete a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    public async deleteCarpool(@Param("id") id: string): Promise<Carpool> {
        return await this._carpoolService.deleteCarpool(id);
    }
}
