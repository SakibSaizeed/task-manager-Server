const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//MiddleWare
app.use(cors()); //! For avoiding cors policy error
app.use(express.json()); //! avoiding body parse json error

//MongoDB user Config from mongodb and securing PASS and User by dotenv
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.btddfnu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//Async function to connect & Operate mongo
async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("taskmanagerDb").collection("tasklist");

    // ! Loading or Creating own server api READ data from Mongodb
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const tasklistfromdb = await cursor.toArray();
      res.send(tasklistfromdb);
    });

    // ! receiving post method data from client side & ADD to Db

    app.post("/task", async (req, res) => {
      const taskdata = req.body;

      // ADD single data to DATABASE
      const result = await taskCollection.insertOne(taskdata);
      res.send(result);
    });
  } finally {
    //  client.close();
  }
}
run().catch(console.dir);

// server side url port running check
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager Server");
});

//Port Listening check in noodemon console
app.listen(port, () => {
  console.log("Listening to", port);
});
