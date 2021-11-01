const router = require ("express").Router();
const Post = require ("../models/Post")

//create a post
router.post("/", async (req,res)=>{
    const newPost = new Post (req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
})
//comment a post 
router.put("/:id/comment",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.comment.includes(req.body.userId)){
            await post.updateOne({$push:{comments:req.body.userId}});
            res.status(200).json(post)
        }else{
            await post.updateOne({$pull:{comments:req.body.userId}});
            res.status(200).json("Comment Deleted")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//update a post
router.put("/:id", async (req,res)=>{
    try{
        const post = Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post Updated")
        }else{
            res.status(403).json("Not your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//delete a post
router.delete("/:id", async (req,res)=>{
    try{
        const post = Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post Deleted")
        }else{
            res.status(403).json("Not your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//like or dislike a post
router.put("/:id/like",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.like.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Post liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Disliked Post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//get a post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err);
    }
})
//get timeline posts

router.get("/timeline/all", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
                return Post.find({ userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts))
    }catch{
        res.status(500).json(err)
    }
})

module.exports = router;