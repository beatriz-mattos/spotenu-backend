import { BandOutputDTO } from './../model/Band';
import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
    protected TABLE_NAME: string = "Sptn_Band";

    public async createBand(band: Band): Promise<void> {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${this.TABLE_NAME} (band_id, name, nickname, email, description, password, is_approved)
                VALUES (
                    '${band.getBandId()}',
                    '${band.getName()}',
                    '${band.getNickname()}', 
                    '${band.getEmail()}',
                    '${band.getDescription()}',
                    '${band.getPassword()}', 
                    ${band.getIsApproved()}
                )
            `);
        } catch (err) {
            throw new Error(err.sqlMessage || err.message);
        }
    };

    public async getBandById(band_id: string): Promise<Band | undefined> {
        try {
            const result = await super.getConnection()
                .select("*")
                .from(this.TABLE_NAME)
                .where({ band_id })

            return Band.toBandModel(result[0]);

        } catch (err) {
            throw new Error(err.sqlMessage || err.message);
        }
    };

    public async approveBandById(band_id: string): Promise<void> {
        try {
            await super.getConnection()
                .update({ is_approved: 1 })
                .from(this.TABLE_NAME)
                .where({ band_id })

        } catch (err) {
            throw new Error(err.sqlMessage || err.message);
        }
    };

    public async getUserByEmailOrNickname(emailOrNickname: string): Promise<Band | undefined> {
        try {

            const result = await super.getConnection()
                .select("*")
                .from(this.TABLE_NAME)
                .where({ email: emailOrNickname })
                .orWhere({ nickname: emailOrNickname })

            return Band.toBandModel(result[0]);

        } catch (err) {
            throw new Error(err.sqlMessage || err.message);
        }
    };

    // public async getAllBands(): Promise<BandOutputDTO> {
    //     try {
    //         const response = await this.getConnection()
    //         .select("name", "email", "nickname", "is_approved")
    //         .from(this.TABLE_NAME)

    //     return response;

    //     } catch (err) {
    //         throw new Error(err.sqlMessage || err.message);
    //     }
    // };
};