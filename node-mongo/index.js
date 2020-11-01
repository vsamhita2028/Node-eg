const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb://localhost:27017/";
const dbname ="conFusion";

mongoClient.connect(uri,(err,client)=>{
    assert.strictEqual(err,null);
    console.log("Server connected Successfully :)");

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name" : "boo", "description" : "testu"},(err, result)=>{
        assert.strictEqual(err,null);

        console.log("After inserting :\n");
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.strictEqual(err,null);

            console.log("Found \n");
            console.log(docs);

            db.dropCollection("dishes",(err,result)=>{
                assert.strictEqual(err,null);
                client.close();
            });
        });
    });
});