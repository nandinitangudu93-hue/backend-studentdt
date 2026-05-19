const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./model/User")
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());
mongoose.connect("mongodb+srv://nandinitangudu93_db_user:aitam3@cluster0.hvu2tbm.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("db connected")
})


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post("/students/add",async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
 
}catch(err){
res.send(err)
}
})
app.get("/students",async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
})
app.get("/students/:id",async(req,res)=>{

    try{
   

        const user = await User.findById(req.params.id);
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

app.delete("/students/:id",async(req,res)=>{

    try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
}
})


app.listen(4000,()=>{
    console.log("server started")
})
