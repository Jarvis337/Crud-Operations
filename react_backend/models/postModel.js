const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  Name:{
    type:String,
    require:true
  },
  Position:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  }
});

module.exports = mongoose.model("Post",postSchema);