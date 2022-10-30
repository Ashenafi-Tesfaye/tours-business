const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
//console.log("DB value " + DB);
//console.log("DB password " + process.env.PASSWORD);

mongoose.connect(DB,
//connect(process.env.DATABASE_LOCAL,
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(con => {
   // console.log("from the connection section");
    console.log(con.connection);
    console.log('DB connection successful!');
});

const app = require('./app');
//console.log(process.env);

const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});