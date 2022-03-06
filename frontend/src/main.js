import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 6000;

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

const app = createApp(App)

app.use(store);

app.use(router).mount('#app');
