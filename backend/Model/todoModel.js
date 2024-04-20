const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    users: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    comment: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "commentModel"
    },
    type: {
        type: String
    },
    channel: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'channelModel'
    }
},
{
    timestamps: true
})

const todoModel = mongoose.model("todoModel", todoSchema);

module.exports = todoModel;