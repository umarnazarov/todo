import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { userModule } from "@/store/modules/UsersModule";
import { todoModule } from "@/store/modules/TodosModule";
import { IError, IState } from './types';
import { modalModule } from './modules/ModalModule';


export default createStore<IState>({
    modules: {
        user: userModule,
        todos: todoModule,
        modal: modalModule
    },

})

export const key: InjectionKey<Store<IState>> = Symbol();

export function useStoreTyped() {
    return baseUseStore(key);
}
