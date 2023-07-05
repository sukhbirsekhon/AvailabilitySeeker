const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./routes/routes');
const cors = require('cors');
const uri = "mongodb+srv://admin:admin@cluster0.xik5f.gcp.mongodb.net/?retryWrites=true&w=majority";

app.use(cors(
  {
    origin: "http://localhost:4200"
  }
));
mongoose.connect(uri,{useNewUrlParser: true,  useUnifiedTopology: true },
function checkDb(error)
{
    if(error)
    {
        console.log("Error Connecting to DB");
        console.log(error);
    }
    else
    {
        console.log("successfully Connected to DB");
    }
});
app.listen(9992,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
});

app.use(express.json());
app.use(routes);