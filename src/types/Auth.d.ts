import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  email: string;
  password: string;
}

interface SessionExtended extends Session {
  access_token?: string;
  user?: UserExtended;
}

interface UserExtended extends User {
  access_token?: string;
  role?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
  access_token?: string;
  id?: string | number; 
}

export type { ILogin, SessionExtended, UserExtended, JWTExtended };
