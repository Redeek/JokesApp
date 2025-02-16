const mongoose = require('mongoose')

const jokeSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    question:{type: String, required: true},
    answer:{type: String, required: true},
    votes: [
        {
            value: {type: Number, default:0},
            label: {type: String, required: true}
        }
    ],
    avaibleVotes: {type:[String], default:["😂", "👍", "❤️"]}

});

const Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;