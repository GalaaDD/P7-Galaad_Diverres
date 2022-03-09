import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';



axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = 'true';

let token = localStorage.getItem("userToken");
console.log(token);
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  // If token expired go to login
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log("error 401");
        localStorage.clear("userToken");
        //  we need to dispatch this user to null
        store.dispatch("user", null);
        router.push({ name: "LogIn" });
      }
      return Promise.reject(error);
    }
  );
}


/*axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})*/

const app = createApp(App)

app.use(store);

app.use(router).mount('#app');
