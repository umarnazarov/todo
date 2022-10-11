import { reactive, toRefs } from "vue";

type IError = {
    message: string,
    url: string | null
}

interface IState<T> {
    data: T | null;
    isPending: boolean;
    isRejected: boolean;
    error: {
        message: string;
    };
}

export async function useFetch<T>(url: string, options?: RequestInit) {

    const state: IState<T> = reactive({
        data: null,
        isPending: false,
        isRejected: false,
        error: {
            message: ''
        }
    })

    const fetchData = async () => {
        if (!url) return;

        state.isPending = true;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            state.data = (await response.json()) as T;

        } catch (error: any) {
            const typedError: Error = error
            state.isRejected = true;
            state.error = {
                message: typedError.message || "ERROR IN FETCH!",
            };
        } finally {
            state.isPending = false
        }
    }

    await fetchData()

    return { ...toRefs(state) }
} 