import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "../entities";
import { authConfig } from "../config";
import { VerificationService } from "./verification.service";

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        private readonly _verificationService: VerificationService
    ) {}

    public async findOneByEmail(email: string): Promise<User> {
        return await this._userRepository.findOne({ where: { email } });
    }

    public async updatePassword(email: string, password: string): Promise<User> {
        const user = await this._userRepository.findOneOrFail({ where: { email } });
        user.password = await bcrypt.hash(password, authConfig.saltOrRounds);
        return this._userRepository.save(user);
    }

    public async createUser(
        email: string,
        hashedPassword: string,
        displayName: string
    ): Promise<User> {
        if (!email || !hashedPassword || !displayName) {
            throw new Error("Email and hashed password are required");
        }

        let user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.displayName = displayName;

        user = await this._userRepository.save(user);
        this._verificationService.sendVerificationEmail(user);
        return user;
    }
}
