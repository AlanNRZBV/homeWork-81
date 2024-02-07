import { Router } from 'express';
import { ILink } from '../types';
import Url from '../models/Urls';
import generateString from '../stringGenerator';


export const linksRouter = Router()

linksRouter.get('/', async (req, res,next)=>{
  try{
    const results = await Url.find()

    res.send(results)
  }catch (e){
    next(e)
  }
})

linksRouter.post('/', async (req, res,next)=>{
  try {

    const test = generateString(6)

    const linkData: ILink = {
      shortUrl:test,
      originalUrl: req.body.url
    };

    const link = new Url(linkData)
    await link.save();

    res.send(link)

  }catch (e){
    next(e)
  }
})

