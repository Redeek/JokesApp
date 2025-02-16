const asyncHandler = require('express-async-handler')

const Joke = require('../models/jokeModel')

const getRandomJoke =  asyncHandler( async (req, res ) => {

    try{
    //get random joke from database
    const randomJoke = await Joke.aggregate([{ $sample: {size: 1} }])
    console.log(randomJoke[0])
    if(!randomJoke.length) return res.status(404).json({error: "No jokes found"})
    
    res.json(randomJoke[0])
    }
    catch(error){
        res.status(500).json(error)
    }
})

const submitVote =  asyncHandler( async (req, res ) => {
    try{
        const {id} = req.params
        const {label} = req.body
        //find joke in database
        const joke = await Joke.findOne({id})

        // check if joke exists in database
        if(!joke) return res.status(404).json({error:"Joke not found"})
        
        //check if labels match with given emojies
        const vote = joke.votes.find(v => v.label === label)
        if(!vote) return  res.status(400).json({error:"Invalid vote type"})
        
        //add value matching emoji
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

        //find joke with given id
        const joke = await Joke.findOne({id})

        //check if joke exist
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})

        //delete joke if exist
        await joke.deleteOne()

        res.json({message:"Joke Deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
    
})

const updateContentJoke =  asyncHandler( async (req, res ) => {
    try {
        const {id} = req.params
        //find joke with given id
        const joke = await Joke.findOne({id})

        //check if joke exist
        if(!joke) return res.status(404).json({error:"Joke doesn't exist"})
        
        //get data from body
        const {question, answer} = req.body

        //check if question and answer are given
        if(!question || !answer) return res.status(400).json({error: "question and answer are required"})
        
        //update joke in database
        await Joke.updateOne({id}, {$set: {question, answer}})
        res.status(200).json({message:"Joke Updated"})
        
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = {getRandomJoke, submitVote, deleteJoke, updateContentJoke}