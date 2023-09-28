const mongoose = require('mongoose');

const DB_USERNAME = process?.env?.DB_USERNAME;
const DB_PASSWORD = process?.env?.DB_PASSWORD;

if (!DB_USERNAME) {
    console.error("DB_USERNAME not defined, please refer to README.md");
    process.exit(1);
}

if (!DB_PASSWORD) {
    console.error("DB_PASSWORD not defined, please refer to README.md");
    process.exit(1);
}

const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.meehb.mongodb.net/database?retryWrites=true&w=majority`;

console.debug("Connecting to database...");
mongoose.connect(dbURI, { useNewUrlParser: true }).then(() => {
    console.debug("Successfully connected to database!");
}).catch((error) => {
    console.error("Unable to connect to database", error);
    process.exit(1);
});

require('./DummyData.model');
require('./Clothing.model');
require('./Outfit.model');
require('./User.model');
require('./Post.model');
