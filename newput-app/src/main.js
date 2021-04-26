import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { router } from './routes/routes';
import { store } from './store/store';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app')
