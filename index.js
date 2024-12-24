const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/events', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const EventSchema = new mongoose.Schema({
    event_name: String,
    location: String,
    date: Date,
    time: String,
});

const Event = mongoose.model('Event', EventSchema);

// CRUD Operations

// Create
app.post('/events', async (req, res) => {
    console.log(req.body)
    const { event_name, location, date, time } = req.body;
    const event = new Event({ event_name, location, date, time });
    await event.save();
    res.status(201).send(event);
});

// Read
app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.status(200).send(events);
});

// Update
app.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { event_name, location, date, time } = req.body;
    const event = await Event.findByIdAndUpdate(id, { event_name, location, date, time }, { new: true });
    res.status(200).send(event);
});

// Delete
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(204).send();
});

// Start Server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});