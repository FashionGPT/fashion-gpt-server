// load additional environment variables (ex: database and storage bucket passwords) from .env file
const env = require('dotenv');
env.config();

// import libraries
const express = require('express');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const app = express();

// initialize database and schemas
require('./model/db');

// config info for auth
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${process.env.PORT}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// controllers
const dummyDataController = require('./controller/DummyData.controller');
const clothingController = require('./controller/Clothing.controller');
const generationController = require('./controller/Generation.controller');
const authController = require('./controller/Auth.controller');
const postController = require('./controller/Post.controller');
const chatGPTController = require('./controller/ChatGPT.controller');

// allow requests from any origin (so our web application can easily communicate with our server)
app.use(cors({ origin: '*' }));

// handle JSON requests and responses nicely
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: delete this example endpoint once we have developed a few real endpoints
// example of how to create an endpoint for a particular resource and link it to a controller
app.use('/api/v1/DummyData', dummyDataController);
app.use('/api/v1/Clothing', clothingController);
app.use('/api/v1/Generation', generationController);
app.use('/api/v1/Auth', authController);
app.use('/api/v1/Post', postController);
app.use('/api/v1/ChatGPT', chatGPTController);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// TODO: delete this
// GET endpoint that returns user detail from auth0
app.get('/', (req, res) => {
  const userDetails = {
    idToken: req?.oidc?.idToken,
    accessToken: req?.oidc?.accessToken,
    refreshToken: req?.oidc?.refreshToken,
    idTokenClaims: req?.oidc?.idTokenClaims,
    user: req?.oidc?.user
  };
  res.send(req?.oidc?.isAuthenticated() ? userDetails : 'Logged out');
});

// start the application so that it listens at port 8081
const port = process?.env?.PORT || 8081;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
