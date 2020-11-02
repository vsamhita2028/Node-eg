const assert = require('assert');

exports.insertDocument=(db,document,collection,callback) => {
    const coll =db.collection(collection);
    coll.insert(document,(err,result)=>{
        assert.strictEqual(err,null);
        console.log("Sucessfully Inserted the document : " , result.result.n);
        callback(result);
    });
}
exports.findDocuments =(db,collection,callback) =>{
    const coll =db.collection(collection);
    coll.find({}).toArray((err,result)=>{
        assert.strictEqual(err,null);
        callback(result);
    });
}
exports.removeDocument = (db,document,collection,callback) =>{
    const coll =db.collection(collection);
    coll.delete(document,(err,result)=>{
        assert.strictEqual(err,null);
        console.log("Removed the document" + document);
        callback(result);
    });
}
exports.updateDocument =(db,document,update,collection,callback) =>{
    const coll =db.collection(collection);
    coll.updateOne(document,{$set : update},null,(err,result)=>{
        assert.strictEqual(err,null);
        console.log("Updated the document with ", update);
        callback(result);
    });
}