const shortid=require('shortid');
const URL=require('../models/url');
async function handleGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
    
}
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:"url is required to convert it into short url"});

    const shortID=shortid();
     await URL.create({
    shortId: shortID,
    redirectUrl: body.url, // ✅ fixed to match schema
    visitHistory: [],
});


    return res.json({id:shortID});
}
module.exports={
    handleGenerateNewShortURL,handleGetAnalytics,
}