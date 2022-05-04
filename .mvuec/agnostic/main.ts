import { createSSRApp } from "vue";
import App from "../../src/App.vue";
import router from "../../src/router";
import  {createPinia}  from "pinia";


export default () => {
    let store = createPinia();
    let app = createSSRApp(App)

    app.use(router);
    app.use(store);
    
    return {app, router};
}








