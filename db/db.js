const { MongoClient } = require("mongodb");

const url = process.env.MONGO;
const client = new MongoClient(url);

const main = async (cb) => {
    await client.connect();
    console.log('our sever is now connected to the database');
    cb();
}

module.exports = { main, client };
