const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  create,
};

function create(req, res) {
  Flight.findById(req.params.flightId, function (err, flight) {
    req.body.flight = req.params.flightId;
    console.log(req.body);
    Ticket.create(req.body, function (err, ticketDocument) {
      res.redirect(`/flights/${req.params.flightId}`);
    });
  });
}
