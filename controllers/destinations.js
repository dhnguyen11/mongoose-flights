const Flight = require('../models/flight');

module.exports = {
    create
}

function create(req, res) {
    // Creating a destination inside a flight
    // Destinations are embedded into the model
    // This means they will be added to the array
    Flight.findById(req.params.id, function(err, flightDocument) {
        // Mutating the document before saving
        flightDocument.destinations.push(req.body);
        // Saving the document with the new item in the body
        flightDocument.save(function(err) {
            // redirecting to the show page
            res.redirect(`/flights/${flightDocument._id}`);
        })
    })
}