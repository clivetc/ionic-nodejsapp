const router = require ("express").Router();
const User = require ("../models/Users");
const bcrypt = require ("bcrypt");

//update user
router.put("/:id", async(req,res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(15);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
            try{
                const user = await User.findByIdUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account Updated")
            }catch{
                return res.status(500).json(err);
            }
        }
    }else{
        return res.status(403).json("Make sure its your account.")
    }
});
//delete user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
            try{
                const user = await User.findbyIdAndDelete(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account Deleted")
            }catch{
                return res.status(500).json(err);
            }
    }else{
        return res.status(403).json("Make sure its your account.")
    }
});
//get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch{
        res.status(500).json(err)
    }
})
//follow
router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push :{followers:req.body.userId}});
                await currentUser.updateOne({ $push :{followings:req.body.id}});
                res.status(200).json("Successfully followed")
            }else{
                res.status(403).json("All ready follow")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("Not Allowed")
    }
})
//unfollow
router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull :{followers:req.body.userId}});
                await currentUser.updateOne({ $pull :{followings:req.body.id}});
                res.status(200).json("Successfully unfollowed")
            }else{
                res.status(403).json("You do not follow")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("Not Allowed")
    }
})
module.exports = router;