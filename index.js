const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/meditationcourses', (req, res) => {
    res.send(JSON.parse('{"data" : [1, 2, 3, 4, 5, "hallo"]}'));
});

app.get('/api/meditationcourses/:id/:name', (req, res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));