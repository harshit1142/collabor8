const teamModel = require('../Model/teamModel');
const userModel = require('../Model/userModel');
const channelModel = require('../Model/channelModel');

async function createChannel(req, res){
    try{
        const body = req.body;
        const teamid = req.params.id;

        let channel = await channelModel.create(body);

        // pushing the channel in the team
        const team = await teamModel.findByIdAndUpdate({
            _id: teamid

        },
        {
            $push:{
                channels: channel._id
            }   
        },
        {
            new: true
        }
        ).populate("users");

        res.status(201).json({
            msg: "Channel created successfully",
            data: team
        })
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        })
    }
}



module.exports = { createChannel }