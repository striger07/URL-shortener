const express=require('express');
const URL=require("./models/url");
const urlRoute=require('./routes/url');
const {connectMongodb}=require('./connect')
const app=express();
const port=8001;
connectMongodb('mongodb://localhost:27017/short-url')
.then(()=>{console.log("mongo connected")});
app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId,
            
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                },
            },
        }

    );
    
    res.redirect(entry.redirectUrl);
});
app.listen(port,()=>{
    console.log('server started');
})