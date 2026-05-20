const User = require('../model/User');

const Addstudent = async(req,res)=>{
    try{

        const user = new User(req.body);

        await user.save();

        res.send(user);
    
    }catch(err){
        res.send(err)
        console.log(err);
    }
};

const deletestudent = async(req,res)=>{

    try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
    res.send(err);
}
};


module.exports = {Addstudent, deletestudent};