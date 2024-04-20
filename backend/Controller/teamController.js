const teamModel = require('../Model/teamModel');
const userModel = require('../Model/userModel');
const generateUniqueId = require('generate-unique-id');

async function createTeam(req, res){
    try{ 
        const adminId = req.params.id;
        const body = req.body;

        let team = await teamModel.create(body);
        const teamid = team._id;
        
        const code = generateUniqueId({
            length: 6,
            includeSymbols: ['@', '#']
        });


        // pushing the generated teamCode and the adminId to the team
        team = await teamModel.findByIdAndUpdate({
            _id: teamid

        },
        {
            $set: { admin: adminId, teamCode: code }, 
            $push: { users: adminId } 
        },
        {
            new: true
        }
        );
        
        // updating the teams of the user(admin)
        await userModel.findByIdAndUpdate({
            _id: adminId
        },
        {
            $push:{
                teams: teamid
            }
        }
        );
        
        res.status(201).json({
            msg : "Team created sucessfully",
            data : team
        })
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        })
    }
}

async function addToTeam(req, res){
    try{
        const teamid = req.params.id;
        const body = req.body;
        const userEmail = body.email;

        const user = await userModel.findOne({ email: userEmail });
        if(!user){
            req.status(500).json({
                msg: "User not found"
            })
            return;
        }

        const team = await teamModel.findOne({ _id: teamid});

        const userExists = team.users.indexOf(user._id);
        if(userExists != -1){
            res.status(500).json({
                msg: "User already exists"
            });
            return;
        }

        // add the user to the team
        const result = await teamModel.findByIdAndUpdate({
            _id: teamid
        },
        {
            $push:{
                users: user._id
            }
        },
        {
            new: true
        }
        )

        // update the teams of the users
        await userModel.findByIdAndUpdate({
            _id: user._id
        },
        {
            $push:{
                teams: teamid
            }
        }
        )

        res.status(201).json({
            msg: "User added successfully",
            data: result
        })
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        })
    }
}

async function joinTeam(req, res){
    try{
        const userid = req.params.id;
        const body = req.body;
        const code = body.teamCode;
        const team = await teamModel.findOne({ teamCode: code});

        // add the user to the team
        const result = await teamModel.findOneAndUpdate({
            teamCode: code
        },
        {
            $push:{
                users: userid
            }
        },
        {
            new: true
        }
        )
        
        // update the teams of the users
        await userModel.findByIdAndUpdate({
            _id: userid
        },
        {
            $push:{
                teams: team._id
            }
        }
        )

        res.status(201).json({
            msg: "User added successfully",
            data: result
        })   
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        }) 
    }

}

async function getUserTeams(req, res){
    try{
        const userid = req.params.id;
        // find all the users teams
        const userTeams = await userModel.findOne({ _id: userid }).populate("teams");

        res.status(201).json({
            msg: "All teams fetched successfully",
            teams: userTeams.teams
        })
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        })
    }

}

// to get all the users in a team
async function getAllUsers(req, res){
    try{
        const teamId = req.params.id;
        const result = await teamModel.findOne({ _id: teamId}).populate('users');
        const users = result.users;

        res.status(201).json({
            msg: "Users fetched successfully",
            data: users
        })
    }
    catch(error){
        res.status(500).json({
            msg: "error"+ error
        })
    }
}

module.exports = { createTeam, addToTeam, getUserTeams, joinTeam, getAllUsers};