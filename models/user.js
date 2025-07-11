const mongooes = require('mongoose');

mongooes.connect('mongodb://localhost:27017/textapp1')

const userSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const User = mongooes.model('User', userSchema);

module.exports = User;
