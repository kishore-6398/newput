import { createRouter, createWebHistory } from 'vue-router';

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
    { path: '/weather', component: Weather, name: 'WeatherView' }
];

export const router = createRouter({
    routes,
    history: createWebHistory()
});