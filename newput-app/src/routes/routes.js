import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store/store';

import Starter from '../components/Starter.vue';
import Todo from '../components/Todos/Todo.vue';
import PVault from '../components/Password/PVault.vue';
import PVaultForm from '../components/Password/PVaultForm.vue';
import Url from '../components/Urls/Url.vue';
import UrlForm from '../components/Urls/UrlForm.vue';
import Notes from '../components/Notes/Notes.vue';
import NotesEditor from '../components/Notes/NotesEditor.vue';
import NotesEditorUpdate from '../components/Notes/NotesEditorUpdate.vue';
import ExpenseForm from '../components/Expense/ExpenseForm.vue';
import PaymentHistory from '../components/Expense/PaymentHistory.vue';
import Weather from '../components/Weather/Weather.vue';
import Login from '../components/Authentication/Login.vue';
import Signup from '../components/Authentication/Signup.vue';
import ForgotPassword from '../components/Authentication/ForgotPassword.vue';
import Error from '../components/Error.vue';
import Settings from '../components/Settings.vue';

const routes = [
    { path: '/', component: Starter, name: 'StarterView' },
    { path: '/todo', component: Todo, name: 'TodoView' },
    { path: '/pvault', component: PVault, name: 'PVaultView' },
    { path: '/pvault/form', component: PVaultForm, name: 'PVaultFormView' },
    { path: '/url', component: Url, name: 'UrlView' },
    { path: '/url/form', component: UrlForm, name: 'UrlFormView' },
    { path: '/notes', component: Notes, name: 'NotesView' },
    { path: '/noteseditor', component: NotesEditor, name: 'NotesEditorView' },
    { path: '/noteseditor/edit/:id', component: NotesEditorUpdate, name: 'NotesEditorUpdateView' },
    { path: '/expense/form', component: ExpenseForm, name: 'ExpenseFormView' },
    { path: '/paymenthistory', component: PaymentHistory, name: 'PaymentHistoryView' },
    { path: '/weather', component: Weather, name: 'WeatherView' },
    { path: '/login', component: Login, name: 'LoginView' },
    { path: '/signup', component: Signup, name: 'SignupView' },
    { path: '/forgotpassword', component: ForgotPassword, name: 'ForgotPasswordView' },
    { path: '/:NotFound(.*)', component: Error, name: 'ErrorView' },
    { path: '/error', component: Error },
    { path: '/settings', component: Settings, name: 'SettingsView' }
];

export const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {
    var isAuthenticated = store.getters.getidToken;
    if (to.name !== 'LoginView' && to.name !== 'SignupView' && to.name !== 'ForgotPasswordView' && isAuthenticated === '' || isAuthenticated === null){
        next({ name: 'LoginView' })
    } 
    else{
        next()
    } 
});