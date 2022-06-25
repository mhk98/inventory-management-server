const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.981i4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        console.log('database connected')
        
      const computerCollection = client.db('dbInventory').collection('Computers')
      const clothCollection = client.db('dbInventory').collection('Clothes')


        //GET
        app.get('/computer',  async(req, res)=>{
            const query = {};
            const cursor = computerCollection.find(query);
            const computers= await cursor.toArray();
            res.send(computers)

        })


        //GET
        app.get('/computer/:id', async(req, res)=>{
          const id= req.params.id;
          const query = {_id: ObjectId(id)};
          const computer = await computerCollection.findOne(query);
          res.send(computer)
        })



//POST
app.post('/computer', async(req, res) =>{
  const product = req.body;
  const result = await computerCollection.insertOne(product);
  res.send(result);
})


app.put('/computer/:id', async(req,res)=>{
  const id = req.params.id;
  const computerProduct = req.body;
  const filter ={_id: ObjectId(id)}
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name:computerProduct.name,
      price:computerProduct.price,
      quantity:computerProduct.quantity,
      img:computerProduct.img
    },
  };

  const result = await computerCollection.updateOne(filter, updateDoc, options)
  res.send(result)
})


app.delete('/computer/:id', async(req, res)=>{
  const id= req.params.id;
  const query= {_id: ObjectId(id)};
  const result = await computerCollection.deleteOne(query);
  res.send(result)

})


app.get('/cloth', async (req, res)=>{
  const query= {}
  const cursor= clothCollection.find(query)
  const clothes= await cursor.toArray();
  res.send(clothes)
})


app.get('/cloth/:id', async(req, res)=>{
  const id= req.params.id;
  const query = {_id: ObjectId(id)};
  const cloth = await clothCollection.findOne(query);
  res.send(cloth)
})


app.post('/cloth', async(req, res)=>{
  const product = req.body;
  const result = await clothCollection.insertOne(product);
  res.send(result)
  
})

app.put('/cloth/:id', async(req,res)=>{
  const id = req.params.id;
  const clothProduct = req.body;
  const filter ={_id: ObjectId(id)}
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name:clothProduct.name,
      price:clothProduct.price,
      quantity:clothProduct.quantity,
      img:clothProduct.img
    },
  };

  const result = await clothCollection.updateOne(filter, updateDoc, options)
  res.send(result)
})

app.delete('/cloth/:id', async(req, res)=>{
  const id= req.params.id;
  const query= {_id: ObjectId(id)};
  const result = await clothCollection.deleteOne(query);
  res.send(result)

})

    }
    finally{

    }
}


run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log('dbConnected')
});