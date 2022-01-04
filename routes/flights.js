const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// GET for flights
router.get('/new', flightsCtrl.new);
router.get('/', flightsCtrl.index);
router.post('/', flightsCtrl.create);
router.get('/:id', flightsCtrl.show);
router.get('/:id/tickets/new', flightsCtrl.newTicket);

module.exports = router;