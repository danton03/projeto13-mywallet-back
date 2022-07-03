import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//Conexão com o banco de dados
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db(process.env.MONGO_DATABASE);
});

const objectId = ObjectId;

export { db, objectId };