import { BandBusiness } from "../business/BandBusiness";
import { HashManager } from "../services/HashManager";
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Request, Response } from "express";
import { BandLoginInputDTO, BandSignupInputDTO } from "../model/Band";
import { BaseDatabase } from "../data/BaseDatabase";

export class BandController {
    private static BandBusiness = new BandBusiness(
        new BandDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );

    async signup(req: Request, res: Response) {
        try {
            const input: BandSignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                description: req.body.description
            };

            const response = await BandController.BandBusiness.signup(input);

            res.status(200).send(response);

        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    async login(req: Request, res: Response) {
        try {
            const { emailOrNickname, password } = req.body;

            const input: BandLoginInputDTO = { emailOrNickname, password };

            const token = await BandController.BandBusiness.login(input);

            res.status(200).send({ token });
        } catch (err) {
            res.status(err.code || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    public async approve(req: Request, res: Response) {
        try {
            await BandController.BandBusiness.approve(req.headers.authorization as string, req.query.id as string);

            res.sendStatus(200);
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message })
        };

        await BaseDatabase.destroyConnection();
    };

    // async getAllBands(req: Request, res: Response) {
    //     try {
    //         const response = await BandController.BandBusiness.getAllBands(req.headers.authorization as string);

    //         res.status(200).send(response);

    //     } catch (err) {
    //         res.status(err.code || 400).send({ message: err.message })
    //     };

    //     await BaseDatabase.destroyConnection();
    // };

};