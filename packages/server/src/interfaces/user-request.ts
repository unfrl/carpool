import { Request } from "express";

import { User } from "../entities";

/**
 * All this does is wrap express' Request type definition with our User entity.
 * This is so when an endpoint is decorated with `UseGuards(AuthGuard('jwt'))`,
 * we can have a type-friendly way of interacting with the user object attached to the request (as opposed to working with a request of type `any`).
 * Note: you **must** have the endpoint decorated, otherwise the user object will be undefined!
 */
export interface UserRequest extends Request {
    user: User;
}
