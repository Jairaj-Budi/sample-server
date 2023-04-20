// @ts-check
import { MongoClient } from "mongodb";
import uri from './atlas_uri.js';
console.log(uri, 'uri');

const client = new MongoClient(uri);

const connectToMongodb = async function() {
    try{
        await client.connect();
        const databasesList = await client.db().admin().listDatabases();
        for(const db of databasesList.databases) {
            console.log(db.name)
        }
        console.log(`Succesfully connected to mongodb`);
    } catch(err) {
        console.log(err, `error in connecting to mongo db`);
    }
}

const findQueries = async(collection) => {
    try {
        const result = await collection.find({'age': {$gte: 24}}).toArray()
        for(const item of result) {
            console.log(item)
        }

        const cursor = collection.find({'age': {$gte: 24}});
        await cursor.forEach(item => console.log(item));


        const findOneResult = await collection.findOne({"age": {$lt: 24}})
		console.log(findOneResult)
    } catch(err) {
        throw err
    }
}

const updateQueries = async(collection) => {
    try {
        const result = await collection.updateMany({'age': {$gte: 24}}, {$set: {'age': 25}})
        const resultOne = await collection.updateOne({'age': 23}, {$set: {'age': 24}})
        console.log(resultOne)
    } catch(err) {
        throw err
    }
}

const deleteQueries = async(collection) => {
    try {
        const result = await collection.deleteMany({'age': {$gte: 24}})
        const resultOne = await collection.deleteOne({'age': 23}, {$set: {'age': 24}})
        console.log(resultOne)
    } catch(err) {
        throw err
    }
}

const sessionQueries = async(collection) => {
    try {
        const session = client.startSession()
        session.
    } catch(err) {
        throw err
    } finally {

    }
}

const bootstrap = async function() {
    try {
        await connectToMongodb();
        const db_name = 'sample_db'
        const collection_name = 'sample'
        const collection = client.db(db_name).collection(collection_name)

        // await findQueries(collection)

        // await updateQueries(collection)

        // await deleteQueries(collection)

        await sessionQueries(collection)
    } catch(err) {
        console.log(err, `Error in connecting mongo db`);
    } finally{
        await client.close();
    }
}

bootstrap();
