const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
dotenv.config();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('<p>This is server</p>');
});

app.post('/', (req, res) => {
  res.send('<p>This is server</p>');
});

app.use((req, res) => {
  res.status(404).send({ message: '404 Not Found - correct your path' });
});


module.exports = require('serverless-http')(app);
