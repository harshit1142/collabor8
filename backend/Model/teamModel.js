const mongoose = require("mongoose"); 

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    

},{
    timestamps: true
})
