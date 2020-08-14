export class Band {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private description: string,
        private isApproved: boolean
    ) {};

    public getId = () => this.id;
    public getName = () => this.name;
    public getEmail = () => this.email;
    public getNickname = () => this.nickname;
    public getPassword = () => this.password;
    public getDescription = () => this.description;
    public getIsApproved = () => this.isApproved;

};

export interface BandInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string,
    description: string,
    isApproved: boolean
};