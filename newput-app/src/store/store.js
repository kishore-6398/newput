import { createStore } from 'vuex';
import sharedModule from './storeModules/sharedModule';
import todosModule from './storeModules/todosModule';
import pVaultModule from './storeModules/pVaultModule';
import weatherModule from './storeModules/weatherModule';

export const store = createStore({
    modules: {
        sharedModule,
        todosModule,
        pVaultModule,
        weatherModule
    }
});