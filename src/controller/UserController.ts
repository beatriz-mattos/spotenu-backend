import { Authenticator } from '../services/Authenticator';
import { UserBusiness } from './../business/UserBusiness';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserDatabase } from './../data/UserDatabase';
import { BaseDatabase } from './../data/BaseDatabase';
import { Request, Response } from "express";
import { SignupInputDTO, LoginInputDTO } from '../model/User';

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    async signup(req: Request, res: Response) {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                type: req.body.type
            };

            res.status(200).send(input);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    async signupAdmin(req: Request, res: Response) {
        try {
            const inputAdmin: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                type: req.body.type
            };

            res.status(200).send(inputAdmin);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    async login(req: Request, res: Response) {
        try {
            const loginData: LoginInputDTO = {
                emailOrNickname: req.body.emailOrNickname,
                password: req.body.password
            };

            res.status(200).send(loginData);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };
};