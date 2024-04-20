const express = require("express");


const { sendMessage, allMessage } = require("../Controller/messageController")
const messageRoutes = express.Router();


messageRoutes
    .route("/:channelId")
    .post(sendMessage)

messageRoutes
    .route("/:channelId")
    .get(allMessage)



module.exports = messageRoutes;