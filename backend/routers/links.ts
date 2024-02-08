import { Router } from 'express';
import { ILink } from '../types';
import Url from '../models/Urls';
import generateString from '../stringGenerator';


export const linksRouter = Router()

linksRouter.get('/:shortUrl', async (req, res,next)=>{
  try{
    const result = await Url.findOne({shortUrl:req.params.shortUrl})
    if (!result){
      return  res.status(404).send({error:'Not Found!'})
    }
    res.status(301).redirect(result.originalUrl)
  }catch (e){
    next(e)
  }
})

linksRouter.post('/', async (req, res,next)=>{
  try {
    let isUnique = false;
    let uniqueString: string = ''



    while (!isUnique){
      uniqueString = generateString(6)
      const uniqueCheck = await Url.findOne({shortUrl:uniqueString})
      if(!uniqueCheck){
        isUnique = true
      }
    }


    const linkData: ILink = {
      shortUrl:uniqueString,
      originalUrl: req.body.url
    };

    const link = new Url(linkData)
    await link.save();

    res.send(link)

  }catch (e){
    next(e)
  }
})

