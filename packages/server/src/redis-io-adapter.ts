import { IoAdapter } from "@nestjs/platform-socket.io";
import * as redisIoAdapter from "socket.io-redis";
import { ServerOptions } from "socket.io";

import { redisConfig } from "./config";

const redisAdapter = redisIoAdapter(redisConfig as any);

export class RedisIoAdapter extends IoAdapter {
    public createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(redisAdapter);
        return server;
    }
}
