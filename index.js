const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ivo4yuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const manageTouristSpotCollections = client.db("spotDB").collection("manageTouristSpotCollections");



    app.post("/spots", async(req, res)=>{
      const touristSpots = req.body;
      const result = await manageTouristSpotCollections.insertOne(touristSpots);
      res.send(result);
    })
    app.get("/spots", async(req, res)=>{
      const result = await manageTouristSpotCollections.find().toArray();
      res.send(result)
    })

    app.get("/spots/:id", async(req, res)=>{
      const id = req.params.id;
      const findID = {_id: new ObjectId(id)};
      const spot = await manageTouristSpotCollections.findOne(findID);
      res.send(spot)
    })

    // app.put("/spots", async(req, res)=>{

    // })





    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {


  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})