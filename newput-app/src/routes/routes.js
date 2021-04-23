import { createRouter, createWebHistory } from 'vue-router';
import Starter from '../components/Starter.vue';
import Todo from '../components/Todos/Todo.vue';

const routes = [
    { path: '/', component: Starter, name: 'StarterView' },
    { path: '/todo', component: Todo, name: 'TodoView' }
];

export const router = createRouter({
    routes,
    history: createWebHistory()
});