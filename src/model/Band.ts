import { USER_TYPE, User } from "./User";

export class Band extends User {
    constructor(
        private band_id: string,
        protected name: string,
        protected email: string,
        protected nickname: string,
        protected password: string,
        protected type: USER_TYPE = USER_TYPE.BAND,  
        private description: string,
        private isApproved: boolean
    ) {
        super(band_id, name, email, nickname, password, type)
    };

    public getBandId = () => this.band_id;
    public getName = () => this.name;
    public getEmail = () => this.email;
    public getNickname = () => this.nickname;
    public getPassword = () => this.password;
    public getDescription = () => this.description;
    public getIsApproved = () => this.isApproved;
    public getType = () => this.type = USER_TYPE.BAND;


    public static toBandModel(band?: any): Band | undefined {
        return (
            band &&
            new Band(
                band.band_id,
                band.name,
                band.email,
                band.nickname,
                band.password,
                USER_TYPE.BAND,
                band.description,
                band.is_approved
            )
        );
    };
};

export interface BandSignupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string,
    description: string
};

export interface BandLoginInputDTO {
    emailOrNickname: string,
    password: string
};