import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        isOpen: true,
        title: "",
        description: "",
        headerTitle: "",
        action: "",
        path: ''
    }),
    actions: {
        clearModalBody(){
            this.description = '';
            this.title = '';
        },
        updateForm(title, description) {
            this.description = description;
            this.title = title;
        }
    }
})