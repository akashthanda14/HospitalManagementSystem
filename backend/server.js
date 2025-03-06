import app from "./app.js";

// Use environment variable for port with fallback to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is Running at Port Number ${PORT}`);
});