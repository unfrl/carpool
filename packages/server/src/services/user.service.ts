import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../entities";

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    public async createUser(
        email: string,
        hashedPassword: string,
        displayName: string
    ): Promise<User> {
        if (!email || !hashedPassword || !displayName) {
            throw new Error("Email and hashed password are required");
        }

        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.displayName = displayName;

        return await this.userRepository.save(user);
    }
}
