import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-country';
import { inspectLinkByCode } from '../models/linksController.js';

export default async function redirect(req, res){
    try{
        let link = await inspectLinkByCode(req.params.url)

        if(link){
            res.redirect(link.original)

            const userAgent = new UAParser(req.headers['user-agent']);
            const device = userAgent.getDevice().name
            const browser = userAgent.getBrowser().name
            const os = userAgent.getOS().name

            const referer = req.headers.referer

            const lookup = geoip.lookup(req.ip);
            const country = lookup ? lookup.country : undefined

            const currentDate = new Date(Date.now())
            currentDate.setSeconds(0,0)

            await addVisit(req.params.url, {ip: req.ip, date: currentDate.toUTCString(), country, device, browser, os, referer})
        }else{
            res.sendStatus(404)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}