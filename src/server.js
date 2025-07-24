const connectDB = require('./config/dbConfig');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT||4000;
const app = express();

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

// Main route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

const con = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

con();

