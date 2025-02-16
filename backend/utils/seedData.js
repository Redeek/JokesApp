const axios = require('axios')
const Joke = require('../models/jokeModel')

const seedData = async() =>{
    try {
        const jokeCount = await Joke.countDocuments()

        if(jokeCount === 0){
            const jokes = []
            for (let i = 0; i <10; i++){
                const joke = await axios.get('https://teehee.dev/api/joke')

                const {id, question, answer} = joke.data

                jokes.push({
                    id,
                    question,
                    answer,
                    votes:[
                        {value: 0, label: "😂"},
                        {value: 0, label: "👍"},
                        {value: 0, label: "❤️"}
                    ],
                    avaibleVotes:["😂", "👍", "❤️"]
                });
            }
            await Joke.insertMany(jokes)
        }

    } catch (error) {
        console.error("error seeding data", error)
    }
}

module.exports = seedData