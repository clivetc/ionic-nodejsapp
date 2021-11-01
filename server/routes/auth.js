const router = require ("express").Router();
const User = require ("../models/Users");
const bcrypt = require ("bcrypt")


//REGISTER
router.post("/register", async (req,res)=>{
    
    try{
        //new password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        //save and response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err)
    }
});
//Login
router.post("/login" , async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("incorrect email or password combination!")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("incorrect email or password combination!")

    res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;