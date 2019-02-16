//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//connect to database
mongoose.connect(`mongodb+srv://testing:${process.env.PASSWORD}@cluster0-ijwse.mongodb.net/test?retryWrites=true`, {useNewUrlParser:true})
.then(() => {
console.info('connected');
})
.catch(err => {
  console.error(err.stack);
})


//Routes
let events = require('./routes/events');
let tickets = require('./routes/tickets');
let verify = require('./routes/verify');

let app = express();  //server

app.use(express.json()); //tar bodyn och gör till json
app.use(cors());

app.route('/events')
.get(events.get)
.post(events.post)

app.route('/tickets')     //skapa endpoint
.post(tickets.post)   //skicka

app.route('/verify/:code')
.get(verify.get)



app.listen(3000, () => {
  console.info('API up n running port: 3000')  //appen lyssnar på en specifik port
})
