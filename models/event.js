const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: String,
    where: {
        place: String,
        city: String
    },
    when: {
        year: Number,
        date: String,
        from: String,
        to: String
    },
    info: String,
    price: Number,
    tickets: {
        available: Number,
        sold: Number
    }
})

let Event = mongoose.model('event', eventSchema);

module.exports = Event;
