// TICKETS

let Ticket = require('../models/ticket');
let Event = require('../models/event');

// GET
module.exports.get = async (req, res) => {
    try {
        res.status(200).send( await Ticket.find({}) );
    } catch(err){
        res.status(500).send(err.stack);
    }
}

// POST
module.exports.post = async (req, res) => {
    try {
        // get event info
        let event = await Event.findById(req.body.event);
        //Kolla om det finns biljetter kvar
        if(event.tickets.available >= (event.tickets.sold + req.body.amount)) {
          let newSold = event.tickets.sold + req.body.amount;
        //Om biljetter finns, uppdatera kvarvarande summa
          await Event.findOneAndUpdate({_id: req.body.event}, {
            tickets: {
              sold: newSold,
              available: event.tickets.available
            }
          })
          //och skapa biljetterna och skicka dem till db
          let tickets = [];
          for(i=0; i<req.body.amount; i++){
              let ticket = {
                  event: event,
                  code: uid(5),
                  used: false
              }
              tickets.push(ticket);
          }

          // write tickets to Mongo
          let resp = await Ticket.create(tickets);
          // Send to FrontEnd
          res.status(200).send(resp);
        } else {
          res.status(200).send('Sorry, all tickets are sold')
        }



    } catch(err) {
        res.status(500).send(err.stack);
    }

}

function uid(len){

    let chars = 'AB1CDE2FG3HIJ4KL5MNO6PQ7RST8UV9WXY0Z';

    let Arr = [];

    for(let i=0; i<len; i++){
        Arr.push(chars[Math.floor(Math.random()*chars.length)]);
    }

    return Arr.join('');
}
