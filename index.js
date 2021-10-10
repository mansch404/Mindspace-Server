const Joi = require('joi');
const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.use(express.json());

// ------DATA------

const courses = [
    { id: 1, name: "Under the stars" },
    { id: 2, name: "Morning meditation" },
    { id: 3, name: "course3" }
];

const yogacourses = [
    { id: 1, name: "Yoga with Manuel", genre: "Morning" },
    { id: 2, name: "Yoga with Manuel", genre: "Chilling" },
    { id: 3, name: "Yoga with Manuel", genre: "Morning" }
];

const calmSounds = [
    { id: 1, name: "Cracking wood", imageURL: "https://example.com" }
];

// ----------------


// ------GET------

app.get('/', (req, res) => {
    res.send('API for Mindspace');
});

app.get('/api/meditationcourses', (req, res) => {
    res.send(courses);
});

app.get('/api/meditationcourses/:data', (req, res) => {
    query = JSON.stringify(req.query);

    if (query === `{"search":"id"}`) {
        const course = courses.find(c => c.data === parseInt(req.params.data));
        if (!course) return res.status(404).send("404 - The course with the given id does not exist.")
        res.send(course);
    } else if (query === `{"search":"genre"}`) {
        var returnArr = [];
        for(let y of courses) {
            if (y.name == req.params.data) returnArr.push(y)
        }
        // if (returnArr.length === 0) return res.status(404).send("404 - The course with the given genre does not exist.")

        res.send(returnArr);
    }
});

app.get('/api/yogacourses', (req, res) => {
    res.send(yogacourses);
});

app.get('/api/yogacourses/:data', (req, res) => {
    query = JSON.stringify(req.query);

    if (query === `{"search":"id"}`) {
        const yogacourse = yogacourses.find(c => c.data == parseInt(req.params.data));
        if (!yogacourse) return res.status(404).send("404 - The course with the given id does not exist.")
        res.send(yogacourse);
    } else if (query === `{"search":"genre"}`) {
        var returnArr = [];
        for(let y of yogacourses) {
            if (y.genre == req.params.data) returnArr.push(y)
        }
        if (returnArr.length === 0) return res.status(404).send("404 - The course with the given genre does not exist.")

        res.send(returnArr);
    }
});

app.get('/api/yogacourses/genre/:genre', (req, res) => {
    console.log(req.query.details)
    
});

app.get('/api/calmsounds', (req, res) => {
    res.send(calmSounds);
});

// ---------------


// ------POST------

app.post('/api/meditationcourses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
    if (!course) return res.status(404).send("404 - The course with the given id does not exist.")
    
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course)
});

// ---------------


// ------DELETE------

app.delete('/api/meditationcourses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("404 - The course with the given id does not exist.")
    
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