import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';
//Establishing the base URL
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = 'true';

//Getting the token from the local storage 
let token = localStorage.getItem("AccessToken");
console.log(token);
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  // If token expired go to login
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log("error 401");
        localStorage.clear("AccessToken");
        store.dispatch('LogOut')
        return router.push('/login')
      } 
      return Promise.reject(error);
    }
  );
}

const app = createApp(App)

app.use(store);

app.use(router).mount('#app');
