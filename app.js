const express = require('express');
const morgan = require('morgan');
const { resourceUsage } = require('process');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//console.log(process.env);

const app = express();
//app.use(morgan('dev'));
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {

    req.requestTime = new Date().toISOString();
    next();
});

const myMiddleWare = (req, res, next) => {

    console.log('Hello from the middleware 🥤');
    next();
};

app.use(myMiddleWare);



// app.get('/', (req, res) => {
//     res.status(200).json({message:'Hello from the server side!', app:"natours"});

// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint....');
// });

//ROUTESRS

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;