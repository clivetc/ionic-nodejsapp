const mongoose = require ("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comm:{
        type:String,
        max:300
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);