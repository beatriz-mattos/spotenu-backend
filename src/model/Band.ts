import { User, USER_TYPE, stringToUserType } from "./User";

export class Band extends User {
    constructor(
        private band_id: string,
        private description: string,
        private isApproved: boolean,
        protected name: string,
        protected email: string,
        protected nickname: string,
        protected password: string,
        protected type: USER_TYPE = USER_TYPE.BAND   
    ) {
        super(band_id, name, email, nickname, password, type)
    };

    protected convertIntToBoolean(value: number): boolean {
        return value === 1;
    };

    protected convertBooleanToInt(value: boolean): number {
        return value ? 1 : 0;
    };

    public getBandId = () => this.band_id;
    public getName = () => this.name;
    public getEmail = () => this.email;
    public getNickname = () => this.nickname;
    public getPassword = () => this.password;
    public getDescription = () => this.description;
    public getIsApproved = () => this.isApproved = this.convertIntToBoolean(0);
    public getType = () => this.type = USER_TYPE.BAND;


    public static toBandModel(band?: any): Band | undefined {
        return (
            band &&
            new Band(
                band.id,
                band.name,
                band.email,
                band.nickname,
                band.password,
                band.description,
                band.isApproved,
                USER_TYPE.BAND
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

export interface BandOutputDTO {
    name: string,
    email: string,
    nickname: string,
    is_approved: boolean
};