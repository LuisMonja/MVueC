import { SSRContext, renderToString } from 'vue/server-renderer'
import index from '../templates/index'
import createApp from '../agnostic/main'

export let render = async (path: string) =>  {
    
    let {app, router} = createApp();

    if(!router.getRoutes().find(route => route.path === path)) return false
    router.push(path);
    await router.isReady()

    const ctx: SSRContext = {}
    const _vue = await renderToString(app, ctx)
    //console.log(ctx)
    let html = index({body: _vue})
    return html
} 