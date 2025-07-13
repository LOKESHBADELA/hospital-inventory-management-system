
const cors = require('cors');
const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
app.use(cors());
const path = require('path');
const jwt = require('jsonwebtoken')


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const userSchema = require('./models/hospital');

app.post('/signup', async (req,res) => {
    let {username , email , password} = req.body;
    let userFind = await userSchema.findOne({email});
    console.log(userFind);
    if(userFind){
        return res.status(400).json({ message: 'User already registered' });
    }
    console.log(req.body);

    bcrypt.genSalt(10, (err,Salt)=>{
        bcrypt.hash(password, Salt , async(err, hash)=>{
            let user = await userSchema.create({
                username,
                email,
                password : hash,
            })
            res.status(201).json({ message: "User created successfully"});
        })
    })
})

app.post('/login', async (req,res)=>{
    let {email , password} = req.body;
    let user = await userSchema.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            // let token = jwt.sign({email:email, userid: user._id}, "shhh");
            res.json("success");
            // res.cookie("token", token);
            res.status(200);
        }
        else{
            res.status(401).send("Wrong Credentials");
        }
    })
})

app.listen(3000, ()=>{
    console.log("server is running");
    
})