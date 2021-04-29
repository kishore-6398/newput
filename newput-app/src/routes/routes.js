import { createRouter, createWebHistory } from 'vue-router';
import Starter from '../components/Starter.vue';
import Todo from '../components/Todos/Todo.vue';
import PVault from '../components/Password/PVault.vue';
import PVaultForm from '../components/Password/PVaultForm.vue';
import Weather from '../components/Weather/Weather.vue';

const routes = [
    { path: '/', component: Starter, name: 'StarterView' },
    { path: '/todo', component: Todo, name: 'TodoView' },
    { path: '/pvault', component: PVault, name: 'PVaultView' },
    { path: '/pvault/form', component: PVaultForm, name: 'PVaultFormView' },
    { path: '/weather', component: Weather, name: 'WeatherView' }
];

export const router = createRouter({
    routes,
    history: createWebHistory()
});