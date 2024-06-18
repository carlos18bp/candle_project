import { createApp } from 'vue'
import { createPinia } from 'pinia';
import '@/assets/styles/style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import globalMixin from '@/mixins/globalMixin';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mixin(globalMixin);

app.mount('#app');