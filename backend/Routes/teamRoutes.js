const express = require('express');
const teamRoutes = express.Router();

const { createTeam, addToTeam, getUserTeams, joinTeam, getAllUsers} = require('../Controller/teamController');

// route to create a team
teamRoutes
.route('/:id') // id: userId
.post(createTeam)

teamRoutes
.route('/:id') // teamid
.get(getAllUsers); // to get all the users of that team

// route to add users to a team and get all the teams of a user
teamRoutes
.route('/admin/:id')
.post(addToTeam) // id: teamid


// route to join using the team code
teamRoutes
.route('/usr/:id') // id: here is userId
.post(joinTeam)
.get(getUserTeams); // id: userid



module.exports = teamRoutes;    