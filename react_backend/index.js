const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://chaitanyapatil236:xepiQHlqHU4KqVc7@cluster0.gxvd79f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/REACT_BACKEND");

const post_route = require('./routes/postRoutes');
app.use('/api' ,post_route);
app.listen(8000,function(){
  console.log("server is running")
});