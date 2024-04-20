const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
   },
   content:{
    type:String,
    trim:true
   },
   channel:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "channelModel"
   },

},{
    timestamps:true
})


const messageModel = mongoose.model("messageModel", messageSchema);

module.exports = messageModel;