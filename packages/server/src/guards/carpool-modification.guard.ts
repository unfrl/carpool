import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRequest } from "src/interfaces";

import { CarpoolService } from "../services";

/*
This Guard ensures that only the user who created a carpool can modify it.
*/
@Injectable()
export class CarpoolModificationGuard implements CanActivate {
    constructor(private readonly _carpoolService: CarpoolService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request as UserRequest);
    }

    private async validateRequest(request: UserRequest): Promise<boolean> {
        const carpool = await this._carpoolService.findCarpoolById(request.params.id);
        return carpool.user.id === request.user.id;
    }
}
