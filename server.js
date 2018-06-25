const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidation = require('express-validation');
const usersRouter = require('./routes/usersRouter');
const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/SimpleLogin";
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Set up mongoose connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/users', usersRouter);
app.get('/', function (req, res) {
  res.redirect(`http://localhost:${PORT}/login.html`);
  res.end();
});

app.use((err, req, res, next)=>{
  if (err instanceof expressValidation.ValidationError){
    const errObject = JSON.parse(err);
    const error = {message: errObject.errors[0].messages[0]};
    return res.status(err.status).send(error);
  } 
  res.status(400).json(err);
});

app.listen(3000, (err)=>{
  if (err){
    throw err;
  }
  console.log(`The app is listening on port ${PORT}`);
})