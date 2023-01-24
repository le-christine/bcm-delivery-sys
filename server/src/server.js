const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


//array to store delivery truck data
// at start up there are 4 trucks out doing deliveries, there are max 8 trucks
let deliveryTrucks = [
    { id: 1, driver: 'John', status: 'Outbound for deliveries' },
    { id: 2, driver: 'Jane', status: 'Outbound for deliveries' },
    { id: 3, driver: 'Bob', status: 'Outbound for deliveries' },
    { id: 4, driver: 'Samantha', status: 'Outbound for deliveries' }
];

// health checkpoint
// view item
app.get('/up', function (req, res) {
  console.log('Request received for /up');
  res.status(200).send('Ok');
  res.json({message: 'Application is up!'});
})


// route to get all delivery trucks
// list items
app.get('/trucks', (req, res) => {
    console.log('Request received for /trucks');
    res.json(deliveryTrucks);
});

//route to get a specific delivery truck by id
// list item
app.get('/trucks/:id', (req, res) => {
    console.log(`Request received to get /trucks/${req.params.id}`);
    const truckId = req.params.id;
    const truck = deliveryTrucks.find(t => t.id === parseInt(truckId));
    if (!truck) {
        res.status(404).send(`Truck with id ${truckId} not found`);
    }
    else {
        res.json(truck);
    }
});

// route to create a new delivery truck
// delivery operator can create item, by default it is available
app.post('/trucks/add', (req, res) => {
  console.log('Request received for /trucks/add');
  if (deliveryTrucks.length < 8) {
    const truck = {
        id: deliveryTrucks.length + 1,
        driver: req.body.driver,
        status: req.body.status
    };
    deliveryTrucks.push(truck);
    res.json(truck);
  }
  else {
    res.sendStatus(405).send(`Error adding truck - limit reached`)
  }
});

//route to update a delivery truck
//update item
app.put('/trucks/:id', (req, res) => {
  console.log(`Request received to update /trucks/${req.params.id}`);

    const truckId = req.params.id;
    const truck = deliveryTrucks.find(t => t.id === parseInt(truckId));
    if (!truck) {
        res.status(404).send(`Truck with id ${truckId} not found`);
    }
    else {
        truck.driver = req.body.driver;
        truck.status = req.body.status;
        res.json(truck);
    }
});

//route to delete a delivery truck
//delete item
app.delete('/trucks/:id', (req, res) => {
  console.log(`Request received to delete /trucks/${req.params.id}`);
    const truckId = req.params.id;
    const truck = deliveryTrucks.find(t => t.id === parseInt(truckId));
    if (!truck) {
        res.status(404).send(`Truck with id ${truckId} not found`);
    }
    else {
        const index = deliveryTrucks.indexOf(truck);
        deliveryTrucks.splice(index, 1);
        res.status(200).send(`Truck with id ${truckId} deleted`);
      }
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log('Example app listening at http://%s:%s', host, port)
})
