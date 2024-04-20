const express = require('express');
const channelRoutes = express.Router();

const { createChannel } = require('../Controller/channelController');

channelRoutes
.route('/:id') // id: teamId
.post(createChannel);


module.exports = channelRoutes;