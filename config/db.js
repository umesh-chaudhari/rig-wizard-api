const mongoose = require("mongoose")
const {MongoClient} = require("mongodb")
require("dotenv").config();

const URL = process.env.MONGO_URL;
const DB_NAME = process.env.MONGO_DB_NAME;
let dbConnection;

module.exports = {
    connectDB: async () => {
        try {
            await MongoClient.connect(URL).then((client) => {
                console.log("MongoDB Connected");
                dbConnection = client.db(DB_NAME)
            })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.error('MongoDB connection failed:', error.message);
            process.exit(1); // Stop the server if the connection fails
        }
    },
    getDb: () => {
        return dbConnection
    }
}