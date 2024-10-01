const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = 5000;
const Routes = require('./routes/route');
dotenv.config();
MONGO_URL=`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.u8gnq.mongodb.net/TaskManager`

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



console.log("MongoDB URL:", MONGO_URL);