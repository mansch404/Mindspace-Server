const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "Meditating with MJA" },
    { id: 2, name: "Morning meditation" },
    { id: 3, name: "course3" }
];

// ------GET------

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/meditationcourses', (req, res) => {
    res.send(courses);
});

app.get('/api/meditationcourses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("404 - The course with the given id does not exist.")
    res.send(course)
});

// ---------------


// ------POST------

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// ----------------

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));