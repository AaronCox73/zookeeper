

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const { animals } = require('./data/animals');
const fs = require('fs');
const path = require('path');




app.use(express.static('public'));


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

fetch('/api/animals', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
        console.log(postResponse);
        alert('Thank you for adding an animal!');
    });

app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});