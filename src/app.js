//EXAMPLE -- BEGIN
// require('dotenv').config();

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', (error) => {
//     console.log(error);
// });
// db.once('open', (error) => {
//     console.log('Connected to Database');
// });

// app.use(express.json());

// const exampleRoute = require('./routes/exampleroute');
// // localhost:300/exampleroute
// app.use('/exampleroute', exampleRoute);

// app.listen(9000, () => {
//     console.log("server started");
// })
//EXAMPLE -- END

require('dotenv').config();
const express = require('express')
const userRouter = require('./routes/user')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})