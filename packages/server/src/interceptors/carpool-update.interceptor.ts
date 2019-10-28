import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CarpoolGateway } from "src/gateways";
import { CarpoolDto } from "src/dtos";

@Injectable()
export class CarpoolUpdateInterceptor implements NestInterceptor {
    constructor(private readonly _carpoolGateway: CarpoolGateway) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap((carpool: CarpoolDto) => {
                this._carpoolGateway.emitCarpoolUpdated(carpool);
            })
        );
    }
}
