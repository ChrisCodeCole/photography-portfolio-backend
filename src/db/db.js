const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', (error) => {
    console.log('Connected to Database');
});