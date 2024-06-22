const Post = require('../models/postModel');

const createPost = async(req,res)=>{
try{
 const post =  new Post({
    Name:req.body.Name,
    Position:req.body.Position,
    image:req.file.filename
  });
  const postData = await post.save();

  res.status(200).send ({success:true,msg:'Post Data',data:postData});


}catch(error){
 res.status(400).send({success:false,msg:error.message});
}
}
const getPosts = async(req,res)=>{
  try{
    const posts = await Post.find({});
    res.status(200).send({success:true,msg:'Posts Data',data:posts});
  } catch(error){
    res.status(400).send({success:false,msg:error.message});
  }
}

const deletePost = async(req,res)=>{

  try{
    const id = req.params.id;
    await Post.deleteOne({ _id:id});
    res.status(200).send({success:true,msg:'Posts delete Successfully:'});

  } catch{
    res.status(400).send({success:false,msg:error.message});
  }
}

const updatePost = async(req,res)=>{

  try{

    if(req.file !== undefined){
      var id = req.body.id;
      var Name = req.body.Name;
      var Position = req.body.Position;
      var filename = req.file.filename;

      await Post.findByIdAndUpdate({ _id:id },{ $set:{ Name:Name, Position:Position, image:filename}});
      res.status(200).send({success:true, msg:'Post Updated Successfully!'})
    }
     else{
        var id = req.body.id;
        var Name = req.body.Name;
        var Position = req.body.Position;

        await Post.findByIdAndUpdate({ _id:id },{ $set:{ Name:Name, Position:Position }});
        res.status(200).send({success:true, msg:'Post Updated Successfully!'})
    }
  }catch(error){
    res.status(400).send({success:false,msg:error.message});
  }
    
  
}

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost
}