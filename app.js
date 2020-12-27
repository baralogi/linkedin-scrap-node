const env = require('dotenv').config()
const chrome = require('chrome-aws-lambda');
const bodyParser = require('body-parser')
const scrapedin = require('scrapedin')
const express = require('express')
const cors = require('cors')
const app = express()

// config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static files path
app.use(express.static(__dirname + '/public'))

// router
app.use('/api/hello', async (req, res) => {
    res.send("hello")
})

app.post('/api/linkedin', async (req, res) => {

    const { linkedin } = req.body

    const profileScraper = await scrapedin({ email: process.env.LINKEDIN_EMAIL, password: process.env.LINKEDIN_PASSWORD })
    const profile = await profileScraper(linkedin)
    res.status(200).send({
        data : profile
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})