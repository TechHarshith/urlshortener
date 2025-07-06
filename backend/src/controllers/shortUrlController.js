import {ShortUrl} from "../models/shorturl.model.js"
import {nanoid} from 'nanoid'

export const getShortUrl =async (req,res)=>{
    try{
     
        const userId = req.user.id;


        const {originalUrl,expiresAt,title,customUrl} = req.body

        if(!originalUrl){
            return res.status(400).send({status:"missing orginalurl in payload"});
        }


        let shortCode ="";

        if(customUrl){
            shortCode= customUrl;
            let existData =await ShortUrl.findOne({shortCode});
            if(existData) return res.status(400).send({status : "try with new code"});
        }else{

            shortCode = nanoid(7);
            let isUnique= false;

            while(!isUnique){
                const existData =await ShortUrl.findOne({shortCode});
                if(!existData) isUnique = true;
                shortCode = nanoid(7);
            }
        }

        const newUser = new ShortUrl(
            {
                originalUrl,
                shortCode,
                userId,
            }
        )
        console.log("im at save ")
        await newUser.save();

        return res.status(200).send({"status" : "success", newUser})

    } catch(error){
        console.error(error);
        return res.status(500).send({ status:" Internal server error"});
    }

}
export const redirectfunction = async (req,res) =>{
     
    try {
        const shortCode = req.params.shortcode;

        const data = await ShortUrl.findOne({shortCode});

        if(!data){
            return res.status(400).send({status : "NOT_FOUND"});
        }
        return res.redirect(data.originalUrl);
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:"INTERNAL_SERVER_ERROR"});
        
    }
        
    }
