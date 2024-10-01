const mongoose = require("mongoose")
const {MongoClient} = require("mongodb")
require("dotenv").config();

const URL = process.env.MONGO_URL;
let dbConnection;

module.exports = {
    connectDB: async () => {
        try {
            await MongoClient.connect(URL).then((client) => {
                console.log("MongoDB Connected");
                dbConnection = client.db()
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
