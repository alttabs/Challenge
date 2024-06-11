const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const UserSchema = require('./models/User'); 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/sendspark';
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', require('./routes/users'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
