const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mongoose connection
mongoose.connect('mongodb+srv://Mugdha:MugdhaJk2397@cluster0.qlqyvrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Model
const Contact = mongoose.model('Contact', ContactSchema);

// Route to handle form submissions
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Booking schema
const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Booking model
const Booking = mongoose.model('Booking', BookingSchema);

// Route to handle booking submissions
app.post('/book-table', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;
    const newBooking = new Booking({ name, email, phone, date, time, guests });
    await newBooking.save();
    res.status(201).json({ success: true, message: 'Booking saved successfully' });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Catering schema and model
const CateringSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Catering = mongoose.model('Catering', CateringSchema);

// Catering form route
app.post('/catering', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;
    const newCatering = new Catering({
      name,
      email,
      phone,
      date,
      time,
      guests
    });
    await newCatering.save();
    res.status(201).json({ success: true, message: 'Response recorded successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
