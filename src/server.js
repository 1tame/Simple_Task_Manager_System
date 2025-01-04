const connectDB = require('./config/dbConfig');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/tasks', taskRoutes);

const con = async () =>{
    try {
         await connectDB();
         app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        })
       
    } catch (error) {
        console.error(error.message);
        process.exit(1);
        
    }
}


 app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})

con();


