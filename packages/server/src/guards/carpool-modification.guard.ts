
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRequest } from 'src/interfaces';

import { CarpoolService } from "../services";

/*
This Guard ensures that only the user who created a carpool can modify it.
*/
@Injectable()
export class CarpoolModificationGuard implements CanActivate {
    constructor(private readonly _carpoolService: CarpoolService) { }
    private _carpoolsRouteSelector: string = "carpools/";

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request as UserRequest);
    }

    private async validateRequest(request: UserRequest): Promise<boolean> {
        const carpoolId = request.url.substring(request.url.lastIndexOf(this._carpoolsRouteSelector) + this._carpoolsRouteSelector.length);
        const carpool = await this._carpoolService.findOneById(carpoolId);
        return carpool.createdById === request.user.id;
    }
}