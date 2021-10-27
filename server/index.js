import express from 'express'
import cors from 'cors'

const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

app.use(express.json({limit: "300mb", extended: true}))
app.use(express.urlencoded({limit: "300mb", extended: true}))

app.get('/', async(req, res) => {
    res.status(200).send('Connection Estabhlished!!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))