// packages
import { defineStore } from "pinia";
import Cookies from 'js-cookie'

// helper
import { api } from "@/helpers";

//types
import { IFetchOptions } from "../types";
import { IUser, IUserResponseBody } from "../types/User/user";

// user store
export const useUserStore = defineStore('user', {
    state: () => ({
        isAdmin: false,
        me: null as IUserResponseBody | null,
        isPending: false,
        isRejected: false,
        error: null,
        allUsers: [] as IUserResponseBody[]
    }),
    getters: {
        isAuthorized(state){
            return (createdBy: string) =>  state.me?.role === 'admin'
        }
    },
    actions: {
        async getUser(
            {
                body: data,
                path,
                method
            }: IFetchOptions
        ) {
            this.isPending = true;
            this.error = null;
            try {
                const res = await api(path, {method,data})
                this.me = res.data
                console.log('GETTING USER')
                const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
                Cookies.set('isAuth', "true", { expires })
            } catch (e: any) {
                this.isRejected = true;
                this.error = e.response.data.message
            } finally {
                this.isRejected = false;
            }
        },
        async getAllUsers() {
            this.isPending = true;
            try {
                const res = await api('/users', { withCredentials: true })
                this.allUsers = res.data;
            } catch (e: any) {
                this.isRejected = true
            } finally {
            this.isPending = false;
            }
        },
        async logout() {
            this.isPending = true;
            try {
                await api('/logout', { method: "POST" })
                Cookies.remove('isAuth')
            } catch (e: any) {
                this.isRejected = true;
            } finally {
                this.isPending = true;
            }
        }
    }
})