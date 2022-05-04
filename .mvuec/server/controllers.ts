import { readdirSync } from 'fs'
import { Express } from 'express'

var routers = readdirSync(process.cwd() + '/src/api')

export default (app: Express) => {

    routers.forEach(router => app.use(require(`${process.cwd()}/${router}`)()))

}