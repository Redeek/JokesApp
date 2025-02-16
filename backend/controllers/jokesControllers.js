const asyncHandler = require('express-async-handler')
const axios = require('axios')

const Joke = require('../models/jokeModel')

const getRandomJoke =  asyncHandler( async (req, res ) => {

    try{
    const joke = await axios.get('https://teehee.dev/api/joke')
    const jokeData = joke.data

    await addJokeToDatabase(jokeData)
    res.status(200).json(jokeData)
    }
    catch(error){
        res.status(500).json(error)
    }
})

const submitVote =  asyncHandler( async (req, res ) => {
    try{
        const {id} = req.params
        const {label} = req.body

        const joke = await Joke.findOne({id})

        if(!joke) return res.status(404).json({error:"Joke not found"})
        
        const vote = joke.votes.find(v => v.label === label)

        if(!vote) return  res.status(400).json({error:"Invalid vote type"})

        vote.value += 1
        await joke.save()
        res.json({message: "Voted!"})
        
    }catch(error){
        res.status(500).json(error)
    }
});

const deleteJoke =  asyncHandler( async (req, res ) => {
    try {
        const {id} = req.params
        const joke = await Joke.findOne({id})
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})
    
        await joke.deleteOne()
        res.json({message:"Joke Deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
    
})

const updateContentJoke =  asyncHandler( async (req, res ) => {
    try {
        const {id} = req.params
        const joke = await Joke.findOne({id})
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})
        
        const {question, answer} = req.body

        if(!question || !answer) return res.status(400).json({error: "question and answer are required"})

        await Joke.updateOne({id}, {$set: {question, answer}})
        res.status(200).json({message:"Joke Updated"})
        
    } catch (error) {
        res.status(500).json(error)
    }
})


const addJokeToDatabase = async (jokeData) => {
    try{
        const {id, question, answer} = jokeData

        const existingJoke = await Joke.findOne({id})
        if(existingJoke){
            console.log("Joke already exists in database")
            return
        }

        var joke = new Joke({
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

        await joke.save()
        console.log("Joke added to the database")
    }catch(error){
        console.error(error)
    }

}

module.exports = {getRandomJoke, submitVote, deleteJoke, updateContentJoke}