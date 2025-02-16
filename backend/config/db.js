const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function fetchJokes() {
    const client = new MongoClient(uri);

    try {
        await client.connect(); 
        console.log("Connected MongoDB!");

        const db = client.db();
        const collection = db.collection('jokes');

        const jokes = await collection.find().toArray();
        console.log(jokes);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Database closed");
    }
}

fetchJokes();