
export const modalModule = {
    namespaced: true,
    state: (): any => ({
        isOpen: false,
        title: "",
        description: "",
        headerTitle: "",
        fetchMethod: "",
        fetchPath: ""
    }),
    mutations: {
        setIsOpen(state: any, payload: boolean) {
            state.isOpen = payload
        },
        setModalBody(state: any, payload: any) {
            state.headerTitle = payload.headerTitle
            state.title = payload.title
            state.description = payload.description
            state.fetchMethod = payload.fetchMethod
            state.fetchPath = payload.fetchPath
        },
        updateTitle(state: any, payload: any) {
            console.log(payload)
            state.title = payload.target.value
        },
        updateDescription(state: any, payload: any) {
            state.description = payload.target.value
        }
    },
    actions: {

    }
}