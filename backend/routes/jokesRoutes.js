const express = require('express')

const {getRandomJoke, submitVote, deleteJoke, updateContentJoke} = require('../controllers/jokesControllers')

const router = express.Router()

//Routes of jokes
router.get('/', getRandomJoke)
router.post('/:id', submitVote)
router.delete('/:id',deleteJoke)
router.put('/:id', updateContentJoke)

module.exports = router