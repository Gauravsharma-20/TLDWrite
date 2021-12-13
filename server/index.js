const express = require('express')
const cors = require('cors')

const speechRoute = require('./routes/speechtotext')
const meetingRoute = require('./routes/meetingsummarisation')
const summaryRoute = require('./routes/textsummarisation')

const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

app.use(express.static('public'))

app.get('/', async(req, res) => {
    res.status(200).send('Connection Estabhlished!!')
})

app.use('/speechtotext', speechRoute)
app.use('/meetingsummarisation', meetingRoute)
app.use('/textsummarisation', summaryRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))