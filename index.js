 const express = require('express');
 const cors = require('cors');
 require('dotenv').config()
 const { MongoClient, ServerApiVersion } = require('mongodb');
 const app = express();
 const port = process.env.PORT || 4000;

 console.log(process.env.DB_PASSWORD);
 console.log(process.env.DB_USER);
 

//  middleware 
 app.use(cors());
 app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j1rq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


 app.get("/",(req,res) => {
    res.send('Cars doctor is running');
 })

 app.listen(port, ()=> {
    console.log(`Cars doctor server is running on Port ${port}`);
 })

