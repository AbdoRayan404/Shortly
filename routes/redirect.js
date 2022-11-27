import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-country';
import {inspectLink, addVisit} from '../models/linksController.js';

export default async function redirect(req, res){
    try{
        let link = await inspectLink(req.params.url)

        if(link){
            res.redirect(link.original)
            let user = new UAParser(req.headers['user-agent']);
            let lookup = geoip.lookup(req.ip);
            let country = lookup ? lookup.country : 'Unknown'
            
            await addVisit(req.params.url, req.ip, country, user.getDevice().name, user.getBrowser().name, user.getOS().name, new Date(Date.now()).toDateString())
        }else{
            res.sendStatus(400)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}