const mongoose = require("mongoose"); 

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teamCode:{
        type: String,
        default: null
    },
    admin: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    channels: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'channelModel'
    }],
    users: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }]
},{
    timestamps: true
})

const teamModel = mongoose.model("userModel", teamSchema);

module.exports = teamModel;