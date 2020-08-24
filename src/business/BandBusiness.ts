import { Band, BandLoginInputDTO, BandSignupInputDTO } from './../model/Band';
import { NotFoundError } from './../error/NotFoundError';
import { BandDatabase } from "../data/BandDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { USER_TYPE, stringToUserType } from '../model/User';

export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) {};

    /* TODO - esses mesmos métodos estão na model, mas não consigo acessá-los por aqui */
    protected convertIntToBoolean(value: number): boolean {
        return value === 1;
    };

    protected convertBooleanToInt(value: boolean): number {
        return value ? 1 : 0;
    };
    /* (?) */

    public async signup(input: BandSignupInputDTO) {

        const { name, email, password, nickname, description } = input;

        if (!name || !email || !description || !password || !nickname) {
            throw new InvalidParameterError("Missing some input")
        };

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email")
        };

        if (input.password.length < 6) {
            throw new InvalidParameterError("Your password must contain at least 6 characters")
        };

        const band_id = this.idGenerator.generate();
        const cryptedPassword = await this.hashManager.hash(password);

        const is_approved = this.convertIntToBoolean(0);

        await this.bandDatabase.createBand(
            new Band(band_id, name, email, nickname, cryptedPassword, stringToUserType(USER_TYPE.BAND), description, is_approved)
        );
    };

    public async login(input: BandLoginInputDTO) {
        const { emailOrNickname, password } = input;

        if (!emailOrNickname || !password) {
            throw new InvalidParameterError("Missing some input")
        };

        const band = await this.bandDatabase.getBandByEmailOrNickname(emailOrNickname);
        console.log(band)

        if (!band) {
            throw new NotFoundError("Band not found")
        };

        const isPasswordCorrect = await this.hashManager.compare(password, band.getPassword());

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Invalid password")
        };

        if (!band.getIsApproved()) {
            throw new UnauthorizedError("Your band wasn't approved")
        };

        const accessToken = this.authenticator.generateToken({
            id: band.getId(),
            type: band.getType()
        });

        return { accessToken };
    };

    public async approve(token: string, band_id: string) {
        if (!token) {
            throw new UnauthorizedError("Missing access token")
        };

        const userData = this.authenticator.getData(token);

        if (userData.type !== USER_TYPE.ADMIN) {
            throw new UnauthorizedError("Only an admin has permission to access this endpoint")
        };

        const result = await this.bandDatabase.getBandById(band_id);

        if (!result) {
            throw new NotFoundError("The band you're looking for couldn't be found with this id")
        };

        await this.bandDatabase.approveBandById(band_id);
    };

    public async getAllBands(token: string) {
        if (!token) {
            throw new UnauthorizedError("Missing access token")
        };

        const userData = this.authenticator.getData(token);

        if(userData.type !== USER_TYPE.ADMIN) {
            throw new UnauthorizedError("Only the admin has permission to access this endpoint")
        };

        const result = await this.bandDatabase.getAllBands();

        if(!result) {
            throw new NotFoundError("There's no bands")
        };

        return result;
    };
};