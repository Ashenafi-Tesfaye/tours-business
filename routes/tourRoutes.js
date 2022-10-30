const fs = require('fs');
const tourController = require('../controllers/tourController');
const express = require('express');

const router = express.Router();

router.param('id', tourController.checkID);

router.
route('/').
get(tourController.getAllTours).
post(tourController.checkBody, tourController.addATour);

router.
route('/:id').
get(tourController.getATourByID).
patch(tourController.updateATour).
delete(tourController.deleteATour);

module.exports = router;