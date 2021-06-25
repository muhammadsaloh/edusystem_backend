import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import postgres from './modules/postgres.js'
import routes from './routes/routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.js'
import config from './config.js'
import fs from 'fs/promises'


async function main () {
    let __dirname = path.resolve(path.dirname(''));
    let db = await postgres()


    let settings = await fs.readFile(path.join(__dirname, 'settings.json'), "utf-8")
    settings = JSON.parse(settings)
        
    const app = express()
    const server = http.createServer(app)
    server.listen(config.PORT, () => console.log(`HTTP server ready at ${config.PORT}`))
    
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(async (req, res, next) => {
        req.postgres = db
        req.settings = settings
        next()
    })
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use((req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*")
        res.set("Access-Control-Allow-Headers", "*")
        next()
    })
    routes(app)

}

main()





