const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  newTicket
};

function index(req, res) {
  Flight.find({}, function (err, flightDocuments) {
    res.render("flights/index", {
      title: "All Flights",
      flights: flightDocuments,
    });
  });
}

function newFlight(req, res) {
  // Making a new flight to get the date
  const newFlight = new Flight();
  const dt = newFlight.departs;
  // converting to local time zone
  let offset = dt.getTimezoneOffset() * 60000;
  const localDt = new Date(dt - offset);
  // Formatting the flight date
  const departsDate = localDt.toISOString().slice(0, 16);
  res.render("flights/new", { title: "New Flight", departsDate });
}

function create(req, res) {
  req.body.flightNo = parseInt(req.body.flightNo);
  // Setting the default flight date
  if (!req.body.departs) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    // converting to local time zone
    let offset = dt.getTimezoneOffset() * 60000;
    const localDt = new Date(dt - offset);
    // Formatting the flight date
    const departsDate = localDt.toISOString().slice(0, 16);
    req.body.departs = localDt.toISOString().slice(0, 16);
  }
  Flight.create(req.body, function (err, flightDocument) {
    if (err) {
      Flight.find({}, function (err, flightDocuments) {
        res.redirect("/flights");
      });
    } else {
      res.redirect("/flights");
    }
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, tickets) {
      res.render("flights/show", {
        title: `Flight No. ${flight.flightNo}`,
        flight,
        tickets
      });
    });
  });
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function (err, flightDocument) {
        res.render("tickets/new", {
            title: `New Ticket for ${flightDocument.flightNo}`,
            flight: flightDocument
        })
    })
}