const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const userModel = require('../Model/userModel')
dotenv.config({ path: '../.env' });
const jwtKey = process.env.JWT_KEY;

async function loginUser(req, res) {
    const { email, password } = req.body;
   console.log(req.body);
    const user = await userModel.findOne({ email: email }).exec();
   
     console.log(user);
     
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const id = user['_id']
                const token = jwt.sign({ payload: id }, jwtKey);
                res.cookie('user', token, { httpOnly: true});
                res.json({
                    status: 201,
                    meassage: "Login successfully",
                    data: user,
                    token: token
                })
            }
            else {
                res.status(500).json({ meassage: "Invalid Password" });
            }
        }
        else {
            res.status(500).json({ meassage: "Invalid email" });
        }
    }


async function postuser(req, res) {
    try {
        const body = req.body;
        const user = await userModel.create(body);

        const id = user['_id']
        const token = jwt.sign({ payload: id }, jwtKey);
        res.cookie('user', token, { httpOnly: true });

        res.json({
            status: 201,
            message: "Registered Successfully",
            data: user,
            token:token
        });
    } catch (error) {
        res.status(500).json({
            message: "error"+error,
            data: []
        })
    }

}



module.exports = { loginUser ,postuser};