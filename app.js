const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const postRouter = require('./routes/post')
require('dotenv').config()

const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, 'client');
const app = express();

app.use(express.json());
app.use('/api/post', postRouter)
app.use(express.static(clientPath))
    
//Connect with database
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
      console.log("---------------------------------------");
      console.log('DB connected');
      console.log("---------------------------------------");
    }
) 

//Listen on the port
app.listen(port, () => {
  console.log("---------------------------------------");
  console.log(`Server has been started on port ${port}`);
  console.log("---------------------------------------");
})

