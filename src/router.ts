import Home from './pages/Home.vue';
import { createRouter, createMemoryHistory } from 'vue-router'

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/', 
            component: Home,
        }
    ] 
})