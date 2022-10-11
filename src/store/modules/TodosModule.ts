import { ITodo } from "../types/Todos/todo";
import { CommitFunction, CommitStateFunction, IError, IFetchOptions, IState, ITodosState } from "../types";
import { api } from '@/helpers';

export const todoModule = {
    namespaced: true,
    state: (): ITodosState => ({
        list: [] as ITodo[],
        isPending: false,
        isPendingDelete: false,
        isPendingUpdate: false,
        isRejected: false,
        isRejectedDelete: false,
        isRejectedUpdate: false,
    }),
    mutations: {
        setTodos(state: ITodosState, payload: ITodo[]) {
            state.list = payload
        },
        setAddTodo(state: ITodosState, payload: ITodo) {
            state.list = [...state.list, payload]
        },
        setDeleteTodo(state: ITodosState, payload: number) {
            state.list = state.list.filter(todo => todo.id !== payload)
        },
        setFetchStatus(state: any, options: any) {
            state[options[0]] = options[1];
        },
        setDeleteErrors(state: any) {
            state.error = []
        },
        setError(state: any, payload: IError) {
            state.error = [...state.error, payload]
        }
    },
    actions: {
        async getTodos(
            { commit }: any,
            {
                path,
                method
            }: IFetchOptions
        ) {
            commit('setTodos', [])
            commit('setFetchStatus', ["isPending", true])
            commit('setDeleteErrors')
            commit('setFetchStatus', ["isRejected", false])
            try {
                const res: any = await api(path, { method })
                commit('setTodos', res.data)
            } catch (e: any) {
                commit('setFetchStatus', ["isRejected", true])
            } finally {
                commit('setFetchStatus', ["isPending", false])
            }
        },
        async handleDeleteTodos({ commit, state }: CommitStateFunction<IState>, {
            body,
            path,
            method
        }: any) {
            try {
                commit('setFetchStatus', ["isPendingDelete", true])
                commit('setFetchStatus', ["isRejectedDelete", false])
                commit('setDeleteErrors')
                await api(path, { method })
                commit('setDeleteTodo', body.id)
            } catch (e) {
                commit('setFetchStatus', ["isRejectedDelete", true])
            } finally {
                commit('setFetchStatus', ["isPendingDelete", false])
            }
        },
        async handleUpdateTodo({ commit, dispatch }: any, {
            body,
            path,
            method
        }: any) {
            try {
                commit('setDeleteErrors')
                commit('setFetchStatus', ["isPendingUpdate", true])
                commit('setFetchStatus', ["isRejectedUpdate", false])
                await api(path, { method, data: body })
                dispatch('getTodos', {
                    path: "/todos",
                    method: 'GET'
                })
            } catch (e: any) {
                commit('setFetchStatus', ["isPendingUpdate", true])
            } finally {
                commit('setFetchStatus', ["isRejectedUpdate", false])
            }

        },
    }
}