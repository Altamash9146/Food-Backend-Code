const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectionStr = `mongodb+srv://Food_App:PokywnCXxLcyUHqH@cluster0.snsxhjf.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionStr, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};

module.exports = connectToDatabase;
