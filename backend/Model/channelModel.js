const mongoose = require("mongoose"); 

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    

},{
    timestamps: true
    
})
