import { ITodo } from "./Todos/todo";
import { IUser, IUserBody } from "./User/user";



export interface IState {
    user: IUser;
    todos: ITodosState;
    modal: any
}

export type IStateModules = 'user' | 'todos'


export interface ITodosState {
    list: ITodo[];
    isPending: boolean;
    isRejected: boolean;
    isPendingDelete: boolean;
    isPendingUpdate: boolean;
    isRejectedDelete: boolean;
    isRejectedUpdate: boolean;
}

export type IError = {
    message: string;
}

export interface IFetchOptions {
    body?: IUserBody;
    path: string;
    method: string;
}