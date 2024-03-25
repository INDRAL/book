const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017/');
const db = client.db('Book');
const usersCollection = db.collection('Users');
const ObjectId = require('mongodb').ObjectId;
// NEW_Book = {
//   id: "9788120790780",
//   progress: "25%",
  
// }

// usersCollection.updateOne( 
//   { _id : new ObjectId("65d0cecdc4f7f667ae6f8bb2") },
//   { $push: { wishlist: NEW_Book } }
// )

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();



app.post("/login", async function(req, res){
  try {
      console.log(req.body);
      const user = await usersCollection.findOne({ emailid :req.body.uemail},{name:1,paswd:1});
      if (user) { 
        //check if password matches
        if(req.body.pswd == user.paswd);
        res.status(200).send(user);
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
});



client.connect()
    .then(() => console.log('Connected Successfully'))
    .catch(error => console.log('Failed to connect', error))

// const PORT = process.env.PORT;
const PORT=5000;
app.listen(5000, () => {
  console.log(`Server is running ${PORT}.`);
});