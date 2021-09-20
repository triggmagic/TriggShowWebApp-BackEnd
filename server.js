const express = require("express");
const cors = require("cors");
const app = express();
const path =require('path');
require('./config/init-firebase');
const port = process.env.PORT || 40;
app.use(cors());
app.use(express.json());
app.use("/", require('./routes'));
// Modifications
app.use(express.static(path.join(__dirname, '/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});