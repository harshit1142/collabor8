const channelModel = require("../Model/channelModel");
const messageModel = require("../Model/messageModel");
const userModel = require("../Model/userModel");


 async function sendMessage(req,res){
     const channelId = req.params.channelId;
     const {content,userId}=req.body;

     var newMessage={
        sender:userId,
        content:content,
        channel:channelId
     }
     try {
        var msg=await messageModel.create(newMessage);

        msg= await msg.populate("sender","name _id");
        msg= await msg.populate("channel");
        msg=await userModel.populate(msg,{
            path:"channel.users",
            select:"name _id"
        })

        await channelModel.findByIdAndUpdate(channelId,{
            latestMessage:msg
        })
         res.json({
             status: 201,
             message: "Message Send",
             data: msg,
         });
     } catch (error) {
         res.json({
             message: "error"+error,
             data: []
         })
     }
  
}

async function allMessage(req, res) {
    const channelId=req.params.channelId;
    try {
        const msg=await messageModel.find({channel :channelId})
        .populate("sender","name _id")
        .populate("channel");
        res.json({
            status: 201,
            message: "All Messages",
            data: msg,
        });
    } catch (error) {
        res.json({
            message: "error" + error,
            data: []
        })
    }
}

module.exports = { sendMessage, allMessage }