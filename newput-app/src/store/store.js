import { createStore } from 'vuex';
import sharedModule from './storeModules/sharedModule';
import todosModule from './storeModules/todosModule';
import pVaultModule from './storeModules/pVaultModule';
import urlModule from './storeModules/urlModule';
import notesModule from './storeModules/notesModule';
import expenseModule from './storeModules/expenseModule';
import weatherModule from './storeModules/weatherModule';
import authenticationModule from './storeModules/authenticationModule';

export const store = createStore({
    modules: {
        sharedModule,
        todosModule,
        pVaultModule,
        urlModule,
        notesModule,
        expenseModule,
        weatherModule,
        authenticationModule
    }
});