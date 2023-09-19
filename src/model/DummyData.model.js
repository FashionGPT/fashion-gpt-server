const mongoose = require('mongoose');

let DummyDataSchema = new mongoose.Schema({
    field1: {
        type: String
    },
    field2: {
        type: String
    },
});

mongoose.model('DummyData', DummyDataSchema);
