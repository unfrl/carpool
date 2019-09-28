import { ApiOperation, ApiUseTags } from "@nestjs/swagger";
import { Post, HttpCode, HttpStatus, Body, HttpException, Controller } from "@nestjs/common";
import { Carpool } from "src/entities";
import { CreateCarpoolDto } from "src/dtos";
import { CarpoolService } from "src/services";

@ApiUseTags("Carpool")
@Controller("api/v1/carpool")
export class CarpoolController {
    public constructor(private readonly _carpoolService: CarpoolService) {}

    @ApiOperation({
        operationId: "createCarpool",
        title: "Create Carpool",
        description: "Create a new Carpool",
    })
    @Post()
    @HttpCode(HttpStatus.OK)
    public async create(@Body() createCarpoolDto: CreateCarpoolDto): Promise<Carpool> {
        const carpool = await this._carpoolService.create(createCarpoolDto);
        if (!carpool) {
            throw new HttpException("Failed to create Carpool", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return carpool;
    }
}
