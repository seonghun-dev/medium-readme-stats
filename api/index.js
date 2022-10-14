const { createRecentPostCard } = require('../src/recent-post');
const app = require('express')();



app.get('/api/status', async (req, res) => {
    try {
        res.status(200).send('Now Running');

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/post', async (req, res) => {
    try {
        const { name } = req.query;
        const result = await createRecentPostCard(name);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log("port 3000 is on")
});

module.exports = app;