import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './inversify.config'
import express from 'express'
import config from "config"
import { connectDB } from './db/connect'
import cors from 'cors'
import './controllers'
const server=new InversifyExpressServer(container)

server.setConfig((app) => {
    app.use(express.json())
    app.use(cors())
})

const app=server.build()

app.listen(config.get("PORT"),()=>{
    console.log(`Server running on port ${config.get("PORT")}`) 
    connectDB()
    .then(()=>{
        console.log("DB Connected !!")
    })
    .catch((error)=>{
        console.log("error in connecting DB !!");
    })
})