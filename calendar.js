const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ChrisCalendar', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Event Schema and Model
const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String
});

const Event = mongoose.model('Event', eventSchema);

// CRUD Operations
app.post('/event', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.send(event);
});

app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

app.get('/event/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.send(event);
});

app.put('/event/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body);
  res.send(event);
});

app.delete('/event/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.send({ message: 'Event deleted' });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
