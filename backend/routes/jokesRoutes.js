const express = require('express')

const {getRandomJoke, submitVote, deleteJoke, updateContentJoke} = require('../controllers/jokesControllers')

const router = express.Router()

router.get('/', getRandomJoke)
router.put('/:id', submitVote)
router.delete('/:id',deleteJoke)
router.put('/:id', updateContentJoke)

module.exports = router