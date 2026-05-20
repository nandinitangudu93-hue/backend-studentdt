const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dns = require('dns');
const userRouter = require('./routes/userRouter');
const jwt = require("jsonwebtoken");
const connectDb = require("./config/db");
const User = require("./model/User");
const bcrypt = require("bcrypt");
require('dotenv').config()


dns.setServers(['8.8.8.8', '1.1.1.1']);

app.use(express.json());
app.use(userRouter);



const db = require("./config/db");

connectDb();

const verifytoken =(req,res,next)=>{

    const token = req.headers.authorization;
    if(!token){
        return res.send("token missing");

    }

    try{
        jwt.verify(token,"secretkey");
       next()
    }catch(err){

        console.log("invalid token")

    }
}





app.get("/students", async(req, res) => {
    try{

        const user = await User.find();

        res.send(user);

    }catch(err){
        console.groupCollapsed(err);
    }
   
});

app.get("/student/:id", async(req, res)=>{
    try{

        const user= await User.findById(req.params.id);
        res.send(user);

    }catch(err){
        console.log(err)

    }
})


app.put("/students/update/:id",async(req,res)=>{
  
     try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )

        res.send(user);

     }catch(err){

     }

})



app.post("/register", async(req, res)=>{
    try{
        const {name,email,password} =req.body;
        const userExists = await User.findOne({email})

      if(userExists){
        return res.end("user already in db");
      }

      const hashpassword = await bcrypt.hash(password,13);
      console.log("hashpassword",hashpassword)


      const user = new User({
        name,
        email,
        password: hashpassword
      })

      await user.save();

      res.send("User Registered Successfully");

    }catch(err){
        console.log(err);

    }
})
app.post("/login", async(req,res)=>{
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.end("user not found");
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.end("invalid pswrd");
        }

        const token = jwt.sign(
            {id:user._id},
            "secretkey",
            {expiresIn:"1h"}
        )
        res.send({
            message:"login successfull",
            token
        })

    }catch(err){
     console.log(err);
    }
})





app.listen(4000, () => {
    console.log("server started");
});