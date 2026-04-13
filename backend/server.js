import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const USERNAME = process.env.username;
const PASSWORD = process.env.password;

app.use(cors())
app.use(express.json())

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "worker"], default: "worker" },
  logintype: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});
const User = mongoose.model("User", userSchema);

const StudentDetailsSchema = new mongoose.Schema({
  std_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  yearofpassing: { type: String, required: true },
  course: { type: String, required: true }, 

  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },   
  city: { type: String, required: true },
  pincode: { type: String, required: true },
}, { timestamps: true });

const StudentDetails = mongoose.model("StudentDetails", StudentDetailsSchema);

const createSuperAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: USERNAME });
    
    if (!adminExists) {
      await User.create({
        username: USERNAME,
        password: PASSWORD, 
        role: "superadmin",
        logintype: "Headquarters",
      });

      console.log(
        "Super Admin account created! Username: G-Tec | Password: G-Tech@admin_nagercoil",
      );
    }
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
};

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  createSuperAdmin();
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      token,
      role: user.role,
      username: user.username,
      logintype: user.logintype,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.post("/api/studentdetails", async (req, res) => {
  try {
    const { 
      std_name, email, phone, course, yearofpassing, 
      address, city, state, country, education, pincode 
    } = req.body;

    const studentDetails = new StudentDetails({
      std_name, email, phone, course, yearofpassing, 
      address, city, state, country, education, pincode
    });    
    
    await studentDetails.save();
    res.status(201).json({ message: "Enrollment successful", student: studentDetails });
  } catch (error) {
    console.error("Error saving student details:", error);
    res.status(500).json({ message: "Server error while saving student details" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await StudentDetails.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});