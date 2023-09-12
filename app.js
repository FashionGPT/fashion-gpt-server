// import libraries
const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv');

// load additional environment variables (ex: database and storage bucket passwords) from .env file
env.config();

// allow requests from any origin (so our web application can easily communicate with our server)
app.use(cors({ origin: '*' }));

// handle JSON requests and responses nicely
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dummy GET endpoint that returns Hello World
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// start the application so that it listens at port 8081
const port = process?.env?.PORT || 8081;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
