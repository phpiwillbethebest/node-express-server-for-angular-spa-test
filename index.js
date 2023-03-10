const express = require('express');
const fs = require('fs').promises; //enable promises (or use)
const cors = require('cors');
const app = express();
const port = 3000;

//enable cors
app.use(cors());

//parse request body
app.use(express.json());

//get
app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile('data.json'); //read data.json
        res.send(JSON.parse(data)); //send parsed json response
    } catch (err) {
        res.status(500).send(err);
    }
});

//put
app.put('/data', async (req, res) => {
    const newData = req.body; //store data from client
    const data = await fs.readFile('data.json'); //read data.json
    let parsedData = JSON.parse(data); //parsed data from data.json
    parsedData.push(newData); //push data from client in data from data.json

    try {
        await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2)); //write all data in data.json file

        let send = await fs.readFile('data.json'); //read data.json
        send = JSON.parse(send); //parse data
        res.send(send); //send it back to the client
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});