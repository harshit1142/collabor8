const express = require('express');
const teamRoutes = express.Router();

const { createTeam, addToTeam, getUserTeams, joinTeam} = require('../Controller/teamController');

// route to create a team
teamRoutes
.route('/:id') // id: adminId
.post(createTeam);

// route to add users to a team and get all the teams of a user
teamRoutes
.route('/usr/:id')
.post(addToTeam) // id: teamid
.get(getUserTeams); // id: userid

// route to join using the team code
teamRoutes
.route('/join/:id') // id: here is userId
.post(joinTeam)


module.exports = teamRoutes;    