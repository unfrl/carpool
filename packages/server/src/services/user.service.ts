import { Injectable, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities';

const SALT_ROUNDS = 10;
const ERRORS = {
    MISSING_CREDENTIALS: 'Missing email or password',
    MISSING_NAME: 'Missing name',
    SIGNIN_FAILED: 'User not found or incorrect password',
    UNKNOWN: 'Unknown error occurred',
};

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    //#region public

    public async signIn(email: string, password: string): Promise<User> {
        if (!email || !password) {
            throw new HttpException(ERRORS.MISSING_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        const user = await this.findOneByEmail(email);
        if (!user) {
            throw new HttpException(ERRORS.SIGNIN_FAILED, HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                throw new HttpException(ERRORS.SIGNIN_FAILED, HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException(ERRORS.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return user;
    }

    public async signUp(email: string, password: string, name: string): Promise<User> {
        if (!email || !password) {
            throw new HttpException(ERRORS.MISSING_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        if (!name) {
            throw new HttpException(ERRORS.MISSING_NAME, HttpStatus.BAD_REQUEST);
        }

        const existing = await this.findOneByEmail(email);
        if (existing) {
            throw new ConflictException('User with same email already exists');
        }

        try {
            const hashed = await bcrypt.hash(password, SALT_ROUNDS);
            return await this.createUser(email, hashed, name);
        } catch (error) {
            throw new HttpException(ERRORS.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //#endregion

    //#region private

    private async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    private async createUser(email: string, hashedPassword: string, name: string): Promise<User> {
        if (!email || !hashedPassword || !name) {
            throw new Error('Email and hashed password are required');
        }

        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.displayName = name;

        return await this.userRepository.save(user);
    }

    //#endregion
}
