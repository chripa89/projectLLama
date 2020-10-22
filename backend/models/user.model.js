const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{ type: String, required: true  },
    passwort: {type: String, required: true},
    alter:{type: Number, required: true},
    groesse:{type: Number, required: true},
    gewicht:{type: Number, required: true},
    geschlecht:{type: String, required: true},
    pal:{type: Number, required: true}
}, {
    timestamps: true,
});

const user = mongoose.model('User', userSchema);

module.exports = user;