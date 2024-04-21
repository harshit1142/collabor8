const express=require('express')
const DB=require('./db')
const cookies = require("cookie-parser");
const cors = require("cors");
const bodyParser=require('body-parser');


const app=express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(cookies({
    origin: 'http://localhost:3000',
    credentials: true,
}));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})




app.listen(process.env.PORT || 4000,()=>{
    console.log("App started on PORT 4000");
})

DB();


const authRoutes = require('./Routes/authRoutes');
const teamRoutes = require('./Routes/teamRoutes');
const channelRoutes = require('./Routes/channelRoutes');
const messageRoutes = require('./Routes/messageRoutes');

app.use("/auth",authRoutes);
app.use("/team", teamRoutes);
app.use('/message', messageRoutes);
app.use("/channel", channelRoutes);