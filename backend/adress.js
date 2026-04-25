const express = require('express');
const cors = require('cors');
const { Country, State, City } = require('country-state-city');
const axios = require('axios'); 
const mongoose = require('mongoose');
const adminAuthRoutes = require('./adminAuth');

const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URI = 'mongodb://127.0.0.1:27017/gtec_database';
const nodemailer = require('nodemailer');

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB successfully connected!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

app.use('/api/admin', adminAuthRoutes);

const studentSchema = new mongoose.Schema({
  name: String,
  dob: String,
  phone:String,
  courseCategory: String,
  course: String,
  educationType: String, // school or college
  institutionName: String,
  classGrade: String,
  department: String,
  degreeLevel: String,
  educationStatus: String,
  passOutYear: String,
  currentYear: String,
  country: Object,
  state: String,
  district: String,
  subDistrict: String,
  pincode: String,
  enrollmentDate: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

const courseSchema = new mongoose.Schema({
  title: String,
  category: String, 
  shortDesc: String,
  fullDesc: String,
  duration: String,
  tags: [String], 
  image: String, 
  syllabus: [String], 
  certifications: [String],
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priceOff: { type: String, required: true }, // E.g., "8,500"
  priceOn: { type: String, required: true },  // E.g., "6,000"
  features: [{ type: String }],               // Array of strings (the bullet points)
  highlighted: { type: Boolean, default: false } // Determines if it's the blue highlighted card
});

const Offer = mongoose.model('Offer', offerSchema);

// 1. Get All Countries
app.get('/api/countries', (req, res) => {
  const countries = Country.getAllCountries().map(c => ({
    id: c.isoCode,
    name: c.name,
    phonecode: c.phonecode,
    flag: c.isoCode.toLowerCase()
  }));
  res.json(countries);
});

// 2. Get States by Country
app.get('/api/states/:countryCode', (req, res) => {
  const states = State.getStatesOfCountry(req.params.countryCode).map(s => ({
    id: s.isoCode,
    name: s.name
  }));
  res.json(states);
});

// 3. Get Districts (Cities) by State
app.get('/api/cities/:countryCode/:stateCode', (req, res) => {
  const cities = City.getCitiesOfState(req.params.countryCode, req.params.stateCode).map(c => ({
    name: c.name
  }));
  res.json(cities);
});

app.get('/api/districts/:countryCode/:stateCode', (req, res) => {
  const { countryCode, stateCode } = req.params;
  
  // Use the library to get cities based on both country and state for accuracy
  const cities = City.getCitiesOfState(countryCode, stateCode).map(c => ({
    id: c.name, // The library doesn't provide unique IDs for all cities, so we use the name
    name: c.name
  }));
  
  res.json(cities);
});

app.get('/api/subdistricts/:districtId', (req, res) => {
  // Since 'country-state-city' doesn't have sub-districts, 
  // we return an empty array or implement custom logic.
  // This prevents the 404 error.
  res.json([]); 
});

// 4. Special Facility for India: Pincode -> Sub-District (Taluk)
// This uses the Government of India's Postal API
app.get('/api/india/pincode/:pin', async (req, res) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${req.params.pin}`);
    const data = response.data[0];
    
    if (data.Status === "Success") {
      // Map the postal data to your sub-district requirement
      const areas = data.PostOffice.map(po => ({
        subDistrict: po.Block,
        district: po.District,
        state: po.State,
        postName: po.Name
      }));
      res.json({ success: true, data: areas });
    } else {
      res.status(404).json({ success: false, message: "Invalid Pincode" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

{/* ---------- Offers Section ---------- */}

app.get('/api/offers', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/offers', async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.json({ success: true, message: "Offer added successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/offers/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Offer deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

{/*------------------ MailSection ---------------*/}

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, countryCode, phone, message } = req.body;

  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'athithabi2003@gmail.com', // Your Gmail address
      pass: 'xonb doeb ldse oxob'   // YOUR 16-DIGIT APP PASSWORD
    }
  });

  // 2. Define the Email Content
  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: 'athithyan.802319@sxcce.edu.in', // Where you want to receive the leads
    subject: `New G-TEC Inquiry from ${firstName}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #2563eb;">New Student Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

{/* -------- Course Section -------- */}

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ success: true, message: "Course added successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Course updated successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Course deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


{/* ------ students Detail section ----- */}

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ enrollmentDate: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enroll', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ success: true, message: "Enrollment Successful!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Professional Geo-Server running on 5000'));