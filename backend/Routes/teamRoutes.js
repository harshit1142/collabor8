const express = require('express');
const teamRoutes = express.Router();

const { createTeam, addToTeam, getUserTeams } = require('../Controller/teamController');

// route to create a team
teamRoutes
.route('/:id') // id: adminid
.post(createTeam);

// route to add users to a team and get all the teams of a user
teamRoutes
.route('/usr/:id')
.post(addToTeam) // id: teamid
.get(getUserTeams); // id: userid


module.exports = teamRoutes;    