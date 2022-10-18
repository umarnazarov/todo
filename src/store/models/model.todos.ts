// packages
import { defineStore } from "pinia";
// helper
import { api } from '@/helpers';
// types
import { ITodo } from "../types/Todos/todo";

export const useTodosStore = defineStore('todos', {
    state: () => ({
        list: [] as ITodo[],
        todoID: '',
        
        isPending: false,
        isPendingDelete: false,
        isPendingUpdate: false,

        isRejected: false,
        isRejectedDelete: false,
        isRejectedUpdate: false,

        error: null as string | null
    }),
    actions: {
        clearStatus(){
            this.isRejected = false
            this.isRejectedDelete = false
            this.isRejectedUpdate = false
        },
        async getTodos() {
            this.list = [];
            this.isPending = true;
            this.error = null;
            this.isRejected = false;
            try {
                const res = await api('/todos', { method: "GET" })
                this.list = res.data as ITodo[]
            } catch (e) {
                this.isRejected = true;
            } finally {
                this.isPending = false;
            }
        },
        async handleDeleteTodos(id:string) {
            try {
                this.isPendingDelete = true;
                this.isRejectedDelete = false;
                this.error = null;
                await api(`/todos/${id}`, { method: "DELETE" })
                this.list = this.list.filter(todo => todo.id !== id)
            } catch (e) {
                this.isRejectedDelete = true;
            } finally {
                this.isPendingDelete = false
            }
        },
        async handleUpdateTodo(data:any, path:string, method: string) {
            try {
                this.error = null;
                this.isPendingUpdate = true;
                this.isRejectedUpdate = false;
                await api(path, { method, data })
                this.getTodos()
            } catch (e: any) {
                this.error = e.response.data.message;
                this.isRejectedUpdate = true
            } finally {
                this.isPendingUpdate = false
            }
        },
    }
})