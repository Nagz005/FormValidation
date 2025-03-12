const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt'); 

const app = express();
const port = 3019;


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/students', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("MongoDB connection successful");
});


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String 
});

const User = mongoose.model("User", userSchema);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;

        
        if (!username || !email || !password || !cpassword) {
            return res.status(400).send("All fields are required!");
        }

        if (password !== cpassword) {
            return res.status(400).send("Passwords do not match!");
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ 
            username, 
            email, 
            password: hashedPassword 
        });

        await user.save();
        console.log("User saved:", user);
        
        res.send("Form Submission Successful");
    } catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
