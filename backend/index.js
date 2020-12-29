require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT
const database = process.env.MONGO_DB

mongoose.connect(`mongodb://root:rootpassword@${host}:${port}/${database}?authSource=admin`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const gameSchema = mongoose.Schema({
    name: String,
    downloads: Number
})

const Game = mongoose.model('Game', gameSchema)

app.get('/games', async (req, res) => {
    Game.find({}, (err, games) => {
        res.send(games)
    })
})

app.post('/games', async (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const downloads = req.body.downloads

    const newGame = new Game({
        name,
        downloads
    })

    newGame.save((err) => {
        if (err) res.send('oops! error')

        res.send(req.body)
    })
})

app.patch('/games', async(req, res) => {
    const name = req.body.name
    const downloads = req.body.downloads

    Game.updateOne({
        name
    }, {
        downloads
    }, (err, result) => {
        res.send(result)
    })
})

app.delete('/games', async(req, res) => {
    const id = req.body.id
    Game.deleteOne({
        id
    }, (err, result) => {
        res.send(result)
    })
})

app.listen(8888)
