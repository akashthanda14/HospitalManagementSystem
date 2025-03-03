// Import mongoose (latest ES Module style)
import mongoose from "mongoose";

// Define your MongoDB connection URI (this can be moved to .env file for security)
const uri = process.env.MONGO_URI || "mongodb+srv://college:akash123@cluster0.d7mvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose (with recommended options)
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,  // Optional - set timeout if needed
            dbName: "hospitalDB",            // Optional - directly specify DB name here if using Atlas
        });

        // Log a success message with connection host
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Handle any errors during connection
        console.error(`❌ MongoDB Connection Error: ${error.message}`);

        // Exit process if connection fails (recommended for backend stability)
        process.exit(1);
    }
};

// Export the connectDB function (latest ES module export style)
export default connectDB;
