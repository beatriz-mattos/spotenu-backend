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

  //   public async getUserById(id: string): Promise<User | undefined> {
  //     const result = await super.getConnection().raw(`
  //       SELECT * from ${this.TABLE_NAME} WHERE id = '${id}'
  //       `);
  //     return this.toModel(result[0][0]);
  //   }

  //   public async getAllUsers(): Promise<User[]> {
  //     const result = await super.getConnection().raw(`
  //       SELECT * from ${this.TABLE_NAME}
  //     `);
  //     return result[0].map((res: any) => {
  //       return this.toModel(res);
  //     });
  //   }
};