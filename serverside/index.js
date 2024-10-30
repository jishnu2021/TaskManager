require('dotenv').config(); // Load environment variables as early as possible

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Routes = require('./routes/route');

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});

console.log("MongoDB URL is:", MONGO_URL);
console.log("Loaded MONGO_URL from .env:", process.env.MONGODB_URL);
