const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path=require('path');
require('dotenv').config();
const connection=require('./Database/connetion')
const User=require('./model/userSchema')

const app = express();
app.use(express.json());
const _dirname=path.resolve()
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true
}));

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));
connection()


// User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username }); // Include username in the response
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.use(express.static(path.join(_dirname,'dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(_dirname,'dist','index.html'))
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));