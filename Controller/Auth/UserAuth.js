const User  = require('../../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const username = email.split('@')[0];

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "111dbhb", {
      expiresIn:"30d",
    });

    res.status(201).json({ message: 'User created successfully', token, email,username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        const username = email.split('@')[0];

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, "111dbhb", {
          expiresIn:"30d",
        });
    
        res.status(200).json({ message: 'User logged successfully', token, email,username });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}




module.exports = {Login,Signup}