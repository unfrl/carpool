import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

import { UserRequest } from "../interfaces";
import { CarpoolService, DriverService } from "../services";

/*
This Guard ensures that only the creator of the carpool or the driver themself can modify the driver.
*/
@Injectable()
export class DriverModificationGuard implements CanActivate {
    constructor(
        private readonly _carpoolService: CarpoolService,
        private readonly _driverService: DriverService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request as UserRequest);
    }

    private async validateRequest(request: UserRequest): Promise<boolean> {
        const carpool = await this._carpoolService.findCarpoolById(request.params.id);
        if (carpool.user.id === request.user.id) {
            //If the user is the creator of the carpool allow modification
            return true;
        }

        return (
            (await this._driverService.findDriverIdByUserCarpoolId(
                request.user.id,
                request.params.id
            )) != undefined
        );
    }
}
