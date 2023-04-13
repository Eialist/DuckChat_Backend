import { MongoClient } from "mongodb";
import * as env from "dotenv";
env.config();

let db = undefined; 
const appDbName = "chat-project";


export function fetchCollection(name) {
    return fetchDatabase().collection(name);
}

function fetchDatabase() {
    if (db != undefined) {
        return db;
    }

    const url = process.env.MONGO_URL;
    const client = new MongoClient(url);

    db = client.db(appDbName);

    return db;
};