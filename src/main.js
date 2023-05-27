import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './styles/app.css';

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');




