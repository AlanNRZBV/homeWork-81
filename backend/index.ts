import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import config from "./config";
import { linksRouter } from './routers/links';

const app = express();
const port = 8000;

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use('/links', linksRouter)

const run = async () => {
  await mongoose.connect(config.mongoose.db)
  console.log('connected')

  app.listen(port, () => {
    console.log(`Server start on ${port} port`)
  });
  process.on('exit', ()=>{
    mongoose.disconnect();
  })

}

void run()