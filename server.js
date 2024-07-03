const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./src/book.model.js");
const mongoose = require('mongoose');
require('dotenv').config();
const PORT=process.env.PORT | 5000;
mongoose
  .connect(process.env.DBUrl
  //   {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
)  
  .then(e => console.log("MongoDB is ready and connected"))
  .catch(console.error); // If you 
const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", async function(req, res)
{
  const {email,paswd,name } = req.body;
  try {
    const user = new User({
      email,
      paswd,
      name,
    });
    await user.save();
    res.send("Saved Successfully.");
  } catch (err) {
    console.log(err);
    res.json(err);
 
  }
});

app.post("/login", async function(req, res)
{
 
      console.log(req.body);
      const user = await User.findOne({ email :req.body.email},{name:1,paswd:1});
      if (user) { 
        //check if password matches
        const result = req.body.paswd.toUpperCase() === user.paswd.toUpperCase();
        if(result)
        {
        res.status(200).send(user);
        }
        else 
        {
          res.sendStatus(203);
        }
      } 
      else 
        {
          res.sendStatus(203);
        }
});


app.get('/', (req, res) => {
  res.send('hello world')
})












 
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}.`);
});