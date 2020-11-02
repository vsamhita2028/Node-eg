const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper =require('./operations');

const uri = "mongodb://localhost:27017/";
const dbname ="conFusion";

mongoClient.connect(uri,(err,client)=>{
    assert.strictEqual(err,null);
    console.log("Server connected Successfully :)");

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    dboper.insertDocument(db,{"name": "Sammy", "description":"Test"},"dishes",(result)=>{
        console.log("Inserted documents \n",result.ops);
        dboper.findDocuments(db,"dishes",(result)=>{
            console.log("Found the document : \n", result);
            dboper.updateDocument(db,{"name":"Sammy"},{"name":"puchku", "description":"testu"},"dishes",(result)=>{
                console.log("Updated the document successfully :)");
                dboper.findDocuments(db,"dishes",(result)=>{
                    console.log("Found the updated document :) \n",result);
                    db.dropCollection("dishes",(result)=>{
                        console.log("Dropped the collecction \n",result);
                        client.close();
                    });
                });
            });
        });
    });
    // collection.insertOne({"name" : "boo", "description" : "testu"},(err, result)=>{
    //     assert.strictEqual(err,null);

    //     console.log("After inserting :\n");
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs)=>{
    //         assert.strictEqual(err,null);

    //         console.log("Found \n");
    //         console.log(docs);

    //         db.dropCollection("dishes",(err,result)=>{
    //             assert.strictEqual(err,null);
    //             client.close();
    //         });
    //     });
    // });
});