import { User, USER_TYPE, LoginInputDTO, stringToUserType } from './../model/User';
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from './../error/UnauthorizedError';
import { NotFoundError } from './../error/NotFoundError';
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { SignupInputDTO } from '../model/User';

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) {};

    public async signup(input: SignupInputDTO) {

        const { name, email, password, nickname, type } = input;

        if (!name || !email || !password || !nickname) {
            throw new InvalidParameterError("Missing some input")
        };

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email")
        };

        if (input.password.length < 6) {
            throw new InvalidParameterError("Your password must contain at least 6 characters")
        };

        const id = this.idGenerator.generate();
        const cryptedPassword = await this.hashManager.hash(password);

        await this.userDatabase.createUser(
            new User(id, name, email, nickname, cryptedPassword, stringToUserType(type))
        );

        const accessToken = this.authenticator.generateToken({
            id,
            type: type
        });

        return { accessToken };
    };

    public async signupAdmin(input: SignupInputDTO, token: string) {

        const { name, email, password, nickname } = input;
        
        if (!token) {
            throw new UnauthorizedError("Missing access token")
        };
        
        const userData = this.authenticator.getData(token);

        if (!name || !email || !password || !nickname) {
            throw new InvalidParameterError("Missing some input")
        };

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email")
        };

        if (userData.type !== USER_TYPE.ADMIN) {
            throw new UnauthorizedError("Only an admin can register another admin")
        };

        if (input.password.length < 10) {
            throw new InvalidParameterError("An admin's password must contain at least 10 characters")
        };

        const id = this.idGenerator.generate();
        const cryptedPassword = await this.hashManager.hash(password);

        await this.userDatabase.createUser(
            new User(id, name, email, nickname, cryptedPassword, USER_TYPE.ADMIN)
        );

        const accessToken = this.authenticator.generateToken({
            id,
            type: "ADMIN"
        });

        return { accessToken };
    };

    public async login(input: LoginInputDTO) {

        const { emailOrNickname, password } = input;
        
        if (!emailOrNickname || !password) {
            throw new InvalidParameterError("Missing some input")
        };

        const user = await this.userDatabase.getUserByEmailOrNickname(emailOrNickname);

        if (!user) {
            throw new NotFoundError("User not found")
        };

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Invalid password")
        };

        const accessToken = this.authenticator.generateToken({
            id: user.getId(),
            type: user.getType()
        });

        return { accessToken };
    };
};