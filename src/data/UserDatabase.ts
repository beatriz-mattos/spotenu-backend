import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  protected TABLE_NAME: string = "Sptn_User";

  public async createUser(user: User): Promise<void> {
    try {
      await super.getConnection().raw(`
        INSERT INTO ${this.TABLE_NAME} (id, name, email, nickname, password, type)
        VALUES (
          '${user.getId()}', 
          '${user.getName()}', 
          '${user.getEmail()}',
          '${user.getNickname()}',
          '${user.getPassword()}', 
          '${user.getType()}'
        )
     `);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public async getUserByEmailOrNickname(emailOrNickname: string): Promise<User | undefined> {
    try {
      const result = await super.getConnection()
        .select("*")
        .from(this.TABLE_NAME)
        .where({ email: emailOrNickname })
        .orWhere({ nickname: emailOrNickname })

      return User.toUserModel(result[0]);

    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
};