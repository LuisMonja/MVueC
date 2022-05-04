import createApp from "../agnostic/main";

let {app, router} = createApp();

router.isReady().then(() => {
    app.mount('#app');
})