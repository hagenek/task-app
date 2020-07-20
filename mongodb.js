const {MongoClient, ObjectID} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-app";

/* console.log(id.id);
console.log(id.getTimestamp())
console.log(id.toHexString().length) */

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database");
  } 

  const db = client.db(databaseName);

/*   db.collection("users").findOne( {_id: new ObjectID("5f11eeeac080bf2fdcabe5c7")}, (error, result) =>
  {
    if (error) {
      return console.log("unable to fetch")
    }

    console.log(result);
  }) */

/*   const updatePromise = db.collection("users").updateOne({
    _id: new ObjectID("5f11f600ac6f054eecba7d83")
  }, {
    $inc: {
      age: 2
    }
  }).then((res) => {
    console.log("Number of documents updates:" , res.matchedCount)
  }).catch((err) => {
    console.log(err)
  })
 */
/* db.collection("tasks").updateMany({
  completed: false
  }, {
    $set: {completed: true}
  }).then((res) => {
    console.log("Number of documents updates:" , res.modifiedCount)
  }).catch((err) => {
    console.log(err)
  }) */

  db.collection("tasks").insertOne({
    description: "Fix the old car",
  }, (error, result) => {
    if (error) {
      return console.log("Unable to insert user")
    }

    console.log(result.ops)
  }) 

  db.collection("users").deleteMany({
    age: 30
    }).then((res) => {
      console.log("Delete many", res.deletedCount)
    }).catch((err) => {
      console.log(err)
    })

    
  db.collection("tasks").deleteOne({
    description: "Fix the old car"
    }).then((res) => {
      console.log("Delete One", res.deletedCount)
    }).catch((err) => {
      console.log(err)
    })




/* db.collection("users").find({age: 30}).toArray((error, users) =>{
  console.log(users)
})


db.collection("users").find({age: 30}).count((error, count) =>{
  console.log(count)
}) */



  


/*   db.collection("users").insertMany([
    {
      name: "Jen",
      age: 28,
    },
    {
      name: "Guenther",
      age: 47,
    }
  ], (error, result) => {
    if (error) {
      return console.log("Unable to insert documents!")
    }

    console.log(result.ops)
  }) */
 
});


