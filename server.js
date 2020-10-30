require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const { request } = require("express");
const MongoClient = require('mongodb').MongoClient



const app = express()



const connectionKey = process.env.DB_PASS;

MongoClient.connect(connectionKey, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('dictionary');
        const wordCollection = db.collection('all-words')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.listen(3000, function() {
            console.log('listening on 3000')
        })

        app.get("/", (req, res) => {
            db.collection('all-words').find().toArray()
                .then(results => {
                    res.render('index.ejs', { words: results })
                })
                .catch( /* ... */ )
        });

        app.post('/words', (req, res) => {
            wordCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.log(error))
        })

        app.put('/words', (req, res) => {
            wordCollection.findOneAndUpdate({ input1: req.body.input1 }, {
                    $set: {
                        input1: req.body.input1,
                        input2: req.body.input2
                    }
                }, {
                    upsert: false
                })
                .then(result => res.json('Success'))
                .catch(error => console.error(error))
        })

        app.delete('/words', (req, res) => {
            wordCollection.deleteOne(req.body)
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No word to delete')
                    }
                    res.json('Deleted Darth Vadar\'s quote')
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))