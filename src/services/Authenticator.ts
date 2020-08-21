import * as jwt from "jsonwebtoken";

export class Authenticator {
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(input, process.env.JWT_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    );

    return token;
  };

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;

    return { id: payload.id, type: payload.type };
  };

};

interface AuthenticationData {
  id: string;
  type: string;
};