const mongoose = require("mongoose"); 

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    team:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teamModel'
    },
    toDo : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'toDoModel'
    }],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageModel"
    }
},{
    timestamps: true
    
})

const channelModel = mongoose.model("channelModel",channelSchema );
module.exports = channelModel;