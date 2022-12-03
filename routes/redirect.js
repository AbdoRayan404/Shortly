import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-country';
import {inspectLink, addVisit} from '../models/linksController.js';

export default async function redirect(req, res){
    try{
        let link = await inspectLink(req.params.url)

        if(link){
            res.redirect(link.original)

            let userAgent = new UAParser(req.headers['user-agent']);
            let device = userAgent.getDevice().name
            let browser = userAgent.getBrowser().name
            let os = userAgent.getOS().name

            let referer = req.headers.referer

            let lookup = geoip.lookup(req.ip);
            let country = lookup ? lookup.country : undefined

            let date = new Date(Date.now())
            date.setSeconds(0,0)

            await addVisit(req.params.url, {ip: req.ip, date: date.toUTCString(), country, device, browser, os, referer})
        }else{
            res.sendStatus(400)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}