import mongoose from "mongoose";

// Use environment variable for production security
const uri = process.env.MONGODB_URI; // Now uses env variable

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            dbName: "hospitalDB",
            maxPoolSize: 10 // Added connection pool limit
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;