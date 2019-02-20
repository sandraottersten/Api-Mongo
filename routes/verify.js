// models
let Ticket = require('../models/ticket');

module.exports.get = async (req, res) => {
  // verify code

  try {
  let resp = await Ticket.find({code: req.params.code});

  if(resp.length == 1) {
    res.status(200).send('Ticket is valid');
  } else {
    res.send('Ticket is not valid').status(406);
  }

} catch(err) {
  res.status(500).send(err);
}

}
