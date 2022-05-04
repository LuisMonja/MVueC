require('dotenv').config();

import datasource from '../src/datasource/datasource'
import app from './server/expressServer'
import { watch } from 'fs';

let datasourceWatcher = watch(process.cwd() + '/src/datasource', {recursive: true});



async function initialize() {


    let ds = await datasource.initialize();
    let server = (await app()).listen(3000);

    server.on('close', () => {
        server.listen(3000);
    })

    server.on('listening', () => {
        console.log('Server is running on port 3000');
    })

    datasourceWatcher.on('change', async (evt, file) => {
        console.log(`Datasource changed, restarting server...`);
        server.close();
        await ds.destroy();
        ds = await datasource.initialize();
    })



    console.log('Application runing');
}

initialize();