const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// ------DATA------

const courses = [
    { id: 1, name: "Under the stars" },
    { id: 2, name: "Morning meditation" },
    { id: 3, name: "course3" }
];

// ----------------


// ------GET------

app.get('/', (req, res) => {
    res.send('API for Mindspace');
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

app.post('/api/meditationcourses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// ----------------


// ------PUT------

app.put('/api/meditationcourses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("404 - The course with the given id does not exist.")
    
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course)
});

// ---------------


// ------DELETE------

app.delete('/api/meditationcourses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("404 - The course with the given id does not exist.")
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// ------------------


// ------FUNCTIONS------

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

// ---------------------

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));