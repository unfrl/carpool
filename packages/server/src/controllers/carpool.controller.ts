import { ApiOperation, ApiUseTags, ApiResponse, ApiCreatedResponse } from "@nestjs/swagger";
import {
    Post,
    Put,
    HttpStatus,
    Body,
    HttpException,
    Controller,
    Param,
    Delete,
    Get,
} from "@nestjs/common";
import { Carpool } from "../entities";
import { CreateCarpoolDto, UpdateCarpoolDto } from "../dtos";
import { CarpoolService } from "../services";

@ApiUseTags("Carpool")
@Controller("api/v1/carpool")
export class CarpoolController {
    public constructor(private readonly _carpoolService: CarpoolService) {}

    @ApiOperation({
        operationId: "createCarpool",
        title: "Create Carpool",
        description: "Create a new Carpool",
    })
    @ApiCreatedResponse({ type: Carpool })
    @Post()
    public async create(@Body() createCarpoolDto: CreateCarpoolDto): Promise<Carpool> {
        const carpool = await this._carpoolService.create(createCarpoolDto);
        if (!carpool) {
            throw new HttpException("Failed to create Carpool", HttpStatus.BAD_REQUEST);
        }
        return carpool;
    }

    @ApiOperation({
        operationId: "getCarpool",
        title: "Get Carpool",
        description: "Retrieve a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    @Get(":id")
    public async get(@Param("id") id: string): Promise<Carpool> {
        const carpool = await this._carpoolService.get(id);
        if (!carpool) {
            throw new HttpException("Carpool not found", HttpStatus.NOT_FOUND);
        }
        return carpool;
    }

    @ApiOperation({
        operationId: "updateCarpool",
        title: "Update Carpool",
        description: "Update a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    @Put(":id")
    public async update(
        @Param("id") id: string,
        @Body() updateCarpoolDto: UpdateCarpoolDto
    ): Promise<Carpool> {
        const carpool = await this._carpoolService.update(id, updateCarpoolDto);
        if (!carpool) {
            //TODO: When we use the class-validator errors we'll be able to tell the difference between not found and some other error here...
            throw new HttpException("Carpool not found", HttpStatus.NOT_FOUND);
        }
        return carpool;
    }

    @ApiOperation({
        operationId: "deleteCarpool",
        title: "Delete Carpool",
        description: "Delete a Carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    @Delete(":id")
    public async delete(@Param("id") id: string): Promise<Carpool> {
        const carpool = await this._carpoolService.delete(id);
        if (!carpool) {
            throw new HttpException("Failed to delete Carpool", HttpStatus.BAD_REQUEST);
        }
        return carpool;
    }
}
