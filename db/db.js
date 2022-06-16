const { MongoClient } = require("mongodb");

const url = "mongodb+srv://Animesh:4545@cluster0.5ukhp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const main = async (cb) => {
    await client.connect();
    console.log('our sever is now connected to the database');
    cb();
}

module.exports = { main, client };