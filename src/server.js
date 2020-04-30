const express = require("express");
path = require("path");
bodyParser = require("body-parser");
cors = require("cors");
mongoose = require("mongoose");
config = require("./config/DB");

const itemRoutes=require('./expressRoutes/itemRoutes');

mongoose.Promise = global.Promise;

mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Error in connecting to database"+err);
    }
  );

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 4000;

app.use('/items',itemRoutes);

var server = app.listen(port,function() {
  console.log("listening on port:" + port);
});