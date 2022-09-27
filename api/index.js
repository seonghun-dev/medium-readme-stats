const { getData } = require('../src/utils');
const app = require('express')();

app.get('/post', async (req, res) => {
    try {
        const { name } = req.query;
        const result = await getData(name);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api', async (req, res) => {
    try {
        res.status(200).send('Now Running');

    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = app;