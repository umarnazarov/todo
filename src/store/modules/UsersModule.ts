// import { useFetch } from "@/hooks/useFetch";
import { CommitStateFunction, IFetchOptions } from "../types";
import { IUser, IUserPayload, IUserResponseBody } from "../types/User/user";
import Cookies from 'js-cookie'
import { api } from "@/helpers";


export const userModule = {
    namespaced: true,
    state: (): IUser => ({
        isAdmin: false,
        me: {
            name: '',
            role: ''
        },
        isPending: false,
        isRejected: false,
        error: '',
        allUsers: []
    }),
    mutations: {
        setUser(state: IUser, payload: IUserPayload) {
            state.isAdmin = payload.role === 'admin' ? true : false;
            state.me.name = payload.name;
            state.me.role = payload.role;
        },
        setIsPending(state: IUser, payload: boolean) {
            state.isPending = payload
        },
        setIsRejected(state: IUser, payload: boolean) {
            state.isRejected = payload
        },
        setUsers(state: IUser, payload: IUserResponseBody[]) {
            console.log(payload)
            state.allUsers = payload
        },
        setError(state: IUser, payload: string) {
            console.log(payload)
            state.error = payload
        }
    },
    actions: {
        async getUser(
            { commit, state }: CommitStateFunction<IUser>,
            {
                body,
                path,
                method
            }: IFetchOptions
        ) {
            commit('setIsPending', true)
            commit('setError', '')
            try {
                const res = await api(path, {
                    withCredentials: true,
                    method,
                    data: body
                })
                commit('setUser', res.data)
                const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
                Cookies.set('isAuth', "true", { expires })
            } catch (e: any) {
                commit('setIsRejected', true)
                commit('setError', e.response.data.message)
            } finally {
                commit('setIsPending', false)
            }
        },
        async getAllUsers({ commit, state }: CommitStateFunction<IUser>) {
            commit('setIsPending', true)
            console.log('GETTING USERS')
            try {
                const res = await api('/users', { withCredentials: true })
                commit('setUsers', res.data)
            } catch (e: any) {
                commit('setIsRejected', true)
            } finally {
                commit('setIsPending', false)
            }
        },
        async logout({ commit, state }: CommitStateFunction<IUser>) {
            commit('setIsPending', true)
            try {
                await api('/logout', {
                    withCredentials: true,
                    method: "POST"
                })
                Cookies.remove('isAuth')
                Cookies.remove('auth')
            } catch (e: any) {
                commit('setIsRejected', true)
            } finally {
                commit('setIsPending', false)
            }
        }
    }
}