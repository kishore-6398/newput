import { createStore } from 'vuex';
import sharedModule from './storeModules/sharedModule';
import todosModule from './storeModules/todosModule';

export const store = createStore({
    modules: {
        sharedModule,
        todosModule
    }
});