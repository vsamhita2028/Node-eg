const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper =require('./operations');

const uri = "mongodb://localhost:27017/";
const dbname ="conFusion";

mongoClient.connect(uri).then((client)=>{
    
    const db = client.db(dbname);
    const collection = db.collection("dishes");
    return dboper.insertDocument(db,{"name": "Sammy", "description":"Test"},"dishes")
    .then((result)=>{
        console.log("Inserted documents \n",result.ops);
        return dboper.findDocuments(db,"dishes");
    }) 
    .then((result)=>{
        console.log("Found the document : \n", result);
        return dboper.updateDocument(db,{"name":"Sammy"},{"name":"puchku", "description":"testu"},"dishes")
    })
    .then((result)=>{
        console.log("Updated the document successfully :)");
        return dboper.findDocuments(db,"dishes");
    })
    .then((result)=>{
        console.log("Found the updated document :) \n",result);
        return db.dropCollection("dishes")
    })
    .then((result)=>{
        console.log("Dropped the collection \n",result);
        client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err)=>console.log(err));