import { InvalidParameterError } from "../error/InvalidParameterError";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private type: USER_TYPE
    ) {};

    public getId = () => this.id;
    public getName = () => this.name;
    public getEmail = () => this.email;
    public getNickname = () => this.nickname;
    public getPassword = () => this.password;
    public getType = () => this.type;

    public static toUserModel(user?: any): User | undefined {
        return (
            user &&
            new User(
                user.id,
                user.name,
                user.email,
                user.nickname,
                user.password,
                stringToUserType(user.type)
            )
        );
    };

};

export const stringToUserType = (input: string): USER_TYPE => {
    switch (input) {
        case "ADMIN":
            return USER_TYPE.ADMIN;

        case "PREMIUM_USER":
            return USER_TYPE.PREMIUM_USER;

        case "FREE_USER":
            return USER_TYPE.FREE_USER;

        default:
            throw new InvalidParameterError("Invalid user type");
    };
};

export enum USER_TYPE {
    ADMIN = "ADMIN",
    PREMIUM_USER = "PREMIUM_USER",
    FREE_USER = "FREE_USER"
};

export interface SignupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string,
    type: string
};

export interface LoginInputDTO {
    emailOrNickname: string,
    password: string
};