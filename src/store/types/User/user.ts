import { IError } from "..";

export interface IUser {
    me: IUserResponseBody | null;
    isPending: boolean;
    isRejected: boolean;
    allUsers: IUserResponseBody[];
    error: string | null
}

export type IUserResponseBody = {
    name: string;
    role: string;
}



enum ROLE { ADMIN = 'admin', USER = 'user' }

export interface IUserPayload {
    name: string;
    role: ROLE.ADMIN | ROLE.USER;
}


export interface IUserBody {
    login: string;
    password: string;
}

