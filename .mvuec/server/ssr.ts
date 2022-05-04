import { createServer as createViteServer } from 'vite';
import { Express } from 'express';
import { readdirSync } from 'fs';

export default async (app: Express) => {
    const vite = await createViteServer({
        configFile: process.cwd() + '/vite.config.ts',

    });

    app.use(vite.middlewares);

    app.get(`*`, async (req, res, next) => {
        try {

            let path = req.originalUrl
            let { render } = await vite.ssrLoadModule(__dirname + '/vue-entry.ts');

            let html = await render(path);
            if (!html) return next();

            html = await vite.transformIndexHtml(path, html);
            return res.setHeader('Content-Type', 'text/html').send(html);
        } catch (e) {
            vite.ssrFixStacktrace(e as Error);
            next(e)
        }
    })


}