let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//skapa ett schema
let ticketSchema = new Schema({
  event: Object,
  code: String,
  used: {type: Boolean, default: false}
});

// skapa modell baserat på schemat
let Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
