const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/apiRoutes');

mongoose.connect('mongodb+srv://choudhurysaptarshi03:C5Bc96rD1x5ZrLZ3@cluster3.kvsalqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Connection error:', err));

app.use(express.json());
app.use('/api', routes);
app.use(express.static('public'));


module.exports = app;

app.get('/', (req, res) => res.send("Server running"));
