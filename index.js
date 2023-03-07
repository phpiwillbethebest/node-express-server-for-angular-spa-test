const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Required to parse JSON in request body

let data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 40 }
];

app.get('/data', (req, res) => {
    res.json(data);
});

app.put('/data', (req, res) => {
    data.push(req.body);
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});