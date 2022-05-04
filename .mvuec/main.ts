require('dotenv').config();

import app from './server/expressServer'
import { watch, existsSync, FSWatcher } from 'fs';

let datasourceWatcher = watch(process.cwd() + '/src/datasource', {recursive: true});

let envWatcher: FSWatcher
if(existsSync(process.cwd() + '/.env')) 
 envWatcher = watch(process.cwd() + '/.env', {recursive: false});



async function initialize() {


    let ds = (await import('../src/datasource/datasource')).default;
    ds.initialize();
    let server = (await app()).listen(3000);

    server.on('close', () => {
        server.listen(3000);
    })

    server.on('listening', () => {
        if(!server.listening) return;
        console.log('Server is running on port 3000');
        
    })

    datasourceWatcher.on('change', async (evt, file) => {
        if(!ds.isInitialized) return;
        console.log(`Datasource changed, restarting server...`);
        await ds.destroy();
        ds = (await import('../src/datasource/datasource')).default;
        ds.initialize();
    })

    envWatcher.on('change', async (evt, file) => {
        console.log(`.env changed, restarting server...`);
        require('dotenv').config();
        await ds.destroy();
        ds = (await import('../src/datasource/datasource')).default;
        ds.initialize();
        server.close();
    })

    console.log('Application runing');
}

initialize();