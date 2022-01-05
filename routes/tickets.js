const express = require('express')
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets')

router.post('/flights/:flightId/tickets/new', ticketsCtrl.create)

module.exports = router;