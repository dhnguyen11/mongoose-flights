// Adding mongoose to the file
const mongoose = require('mongoose');
// Shortcut to schema object
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat:{
        type: String,
        match: /[A-F][1-9]\d?/
    },
    price:{
        type: Number,
        min: 0
    },
    flight: {
        type: Schema.Types.ObjectId, 
        ref: 'Flight'
    }
})