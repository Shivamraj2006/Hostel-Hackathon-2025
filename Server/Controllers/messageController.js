import Message from '../Models/Message.js';

export const getMessage=async(req,res)=>{
    try{
        const messages=await Message.find().sort({createdAt:-1});
        res.json(messages);
    }
    catch(err){
        res.satus(500).json({error:"failed to connect"});
    }
};