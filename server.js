const express = require("express");
const cors = require("cors");
const app = express();
require('./config/init-firebase');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/", require('./routes'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});