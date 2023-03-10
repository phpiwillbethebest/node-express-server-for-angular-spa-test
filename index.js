const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

const dataFile = 'data.json';

app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile(dataFile);
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/data', async (req, res) => {
    try {
        const newData = req.body;

        const data = await fs.readFile(dataFile);
        const parsedData = JSON.parse(data);

        newData.id = uuidv4();
        parsedData.push(newData);

        await fs.writeFile(dataFile, JSON.stringify(parsedData, null, 2));

        const updatedData = await fs.readFile(dataFile);
        const parsedUpdatedData = JSON.parse(updatedData)

        res.status(201).json(parsedUpdatedData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});