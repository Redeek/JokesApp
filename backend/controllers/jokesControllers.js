const asyncHandler = require('express-async-handler')

const Joke = require('../models/jokeModel')

// Get random joke from database
const getRandomJoke =  asyncHandler( async (req, res ) => {

    try{
    const randomJoke = await Joke.aggregate([{ $sample: {size: 1} }])
    
    // Check if any jokes exist in the database
    if(!randomJoke.length) return res.status(404).json({error: "No jokes found"})
    
    res.json(randomJoke[0])
    }
    catch(error){
        res.status(500).json(error)
    }
})

// Submit a vote for a joke
const submitVote =  asyncHandler( async (req, res ) => {
    try{
        const {id} = req.params
        const {label} = req.body
        // Find joke in database
        const joke = await Joke.findOne({id})

        // Return an error if joke is not found
        if(!joke) return res.status(404).json({error:"Joke not found"})
        
        // Validate if the provided vote label is valid
        const vote = joke.votes.find(v => v.label === label)
        if(!vote) return  res.status(400).json({error:"Invalid vote type"})
        
        // Increment value
        vote.value += 1

        await joke.save()
        res.json({message: "Voted!"})
        
    }catch(error){
        res.status(500).json(error)
    }
});

// Delete joke from the database
const deleteJoke =  asyncHandler( async (req, res ) => {
    try {
        const {id} = req.params

        // Find joke with given id
        const joke = await Joke.findOne({id})

        // Return an error if joke doesn't exist
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})

        await joke.deleteOne()

        res.json({message:"Joke Deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
    
})

// Update content of the joke with provided data
const updateContentJoke =  asyncHandler( async (req, res ) => {
    try {
        const {id} = req.params

        // Find joke with given id
        const joke = await Joke.findOne({id})

        // Return an error if joke doesn't exist
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})
        
        // Get provided data from body
        const {question, answer} = req.body

        // Check if question and answer are provided
        if(!question || !answer) return res.status(400).json({error: "question and answer are required"})
        
        // Update joke in the database
        await Joke.updateOne({id}, {$set: {question, answer}})
        res.status(200).json({message:"Joke Updated"})
        
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = {getRandomJoke, submitVote, deleteJoke, updateContentJoke}