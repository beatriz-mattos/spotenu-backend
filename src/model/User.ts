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

    // public setId = (id: string) => this.id = id;
    // public setName = (name: string) => this.name = name;
    // public setNickame = (nickname: string) => this.nickname = nickname;
    // public setEmail = (email: string) => this.email = email;
    // public setPassword = (password: string) => this.password = password;
    // public setType = (type: UserType) => this.type = type;
    // public setDescription = (description: string) => this.description = description;
    // public setIsApproved = (is_approved: boolean) => this.is_approved = is_approved;

    public static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.nickname,
            user.password,
            user.stringToUserType(user.type)
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
    }
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

// export interface BandInputDTO {
//     name: string,
//     email: string,
//     nickname: string,
//     password: string,
//     description: string,
//     isApproved: boolean
// };