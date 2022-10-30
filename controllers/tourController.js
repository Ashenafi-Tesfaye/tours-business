const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    if((req.params.id * 1 > tours.length)) {
        return res.status(400).json({
            status:'fail',
            message:' Invalid ID'
        });
    }
    next();
};

//create a checkBody middleware
//check is a body contains the name and price property 
//if not, send back 400 (bad request)
//Add it to the post handler stack 
exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status:'fail',
            message:' Missing name or price info.'
        });
    }
    next(); 
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
     status: 'success',
     requestedAt: req.requestTime,
     results : tours.length,
     data : {
         tours
     }
    });
 };

 exports.getATourByID = (req, res) => {
     const id = req.params.id * 1;
     
     const tour = tours.find(el => el.id === id);
 
     if (!tour) {
         res.status(200).json({
             status: 'success',
              data : {
                  tour: tour
              }
            });
     } else {
         res.status(404).json({
             status: 'not found',
              data : {
                  tour
              }
            });
     }
     
  };

exports.addATour = (req, res) => {
 const newID = tours[tours.length-1].id + 1;
 const newTour = Object.assign ({id: newID}, req.body);
 
 tours.push(newTour);
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
     res.status(201).json({
         status: 'success',
         data: {
            tour: newTour
         }
     });
 });
 };

exports.updateATour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here ....>'
        }
    });
};

exports.deleteATour = (req, res) => {
  res.status(204).json({
            status: 'success',
            message: 'null'
  });
};


