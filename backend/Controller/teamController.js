const teamModel = require('../Model/teamModel');
const generateUniqueId = require('generate-unique-id');

async function createTeam(req, res){
    try{
        const adminId = req.params.id;
        const body = req.body;
        const team = await teamModel.create(body);
        const teamid = team._id;
        
        const code = generateUniqueId({
            length: 6,
            includeSymbols: ['@', '#']
        });
        
        await teamModel.findByIdAndUpdate({
            _id: teamid
        },
        {
            $push:{
                admin: adminId,
                teamCode: code
            }
        }
        );
        
        res.json({
            status:201,
            msg : "Team created sucessfully",
            data : team
        })
    }
    catch(error){
        res.json({
            msg: "error"+ error
        })
    }
}

async function getTeam(req, res){
    try{
        const userid = req.params.id;
        

    }
    catch(error){
        res.json({
            msg: "error"+ error
        })
    }

}

