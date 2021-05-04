import { createStore } from 'vuex';
import sharedModule from './storeModules/sharedModule';
import todosModule from './storeModules/todosModule';
import pVaultModule from './storeModules/pVaultModule';
import urlModule from './storeModules/urlModule';
import expenseModule from './storeModules/expenseModule';
import weatherModule from './storeModules/weatherModule';

export const store = createStore({
    modules: {
        sharedModule,
        todosModule,
        pVaultModule,
        urlModule,
        expenseModule,
        weatherModule
    }
});