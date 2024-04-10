const express = require('express');
const cors = require('cors')
const connectDB = require('./db/connect')
const app = express();
const authRoute = require('./routes/auth.route')

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/api/auth/', authRoute)

const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await app.listen(3000, () => {
            console.log('app is listening on ' + port);
        })
    } catch (error) {
        console.log(error);
    }

}

start();