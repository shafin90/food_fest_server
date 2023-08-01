const express = require('express')
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yhuz2xd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  async function run() {
    try {
  
  
  
  
  
    const infoCollection = client.db("Food_fest").collection('food_fest');


    // This route is for getting all data from database============
      app.get('/all_info', async(req,res)=>{
        const allInfo = infoCollection.find();
        const finalResult =  await allInfo.toArray();
        res.send(finalResult);
      })


    // This route is to get a specific data using _id from database============
    app.get('/all_info/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const specificInfo = await infoCollection.findOne(query);
        res.send(specificInfo);
      })



    } finally {

        // await client.close();
      }
    }
    run().catch(console.dir);












app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})