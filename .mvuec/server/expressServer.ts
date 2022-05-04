import express from 'express';
import ssr from './ssr';
import controllers from './controllers';

export default async () => {
    const app = express();
    
    await ssr(app);
    controllers(app);


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app
}



