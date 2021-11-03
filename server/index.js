const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const spawn = require('child_process').spawn

const storage = multer.diskStorage({
    destination: `${__dirname}/public/uploads`,
    filename: function(req, file, cb){
       cb(null, + Date.now() + path.extname(file.originalname));
    }
})
 
const upload = multer({ storage: storage }).single('file')

const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

app.use(express.static('public'))

app.get('/', async(req, res) => {
    res.status(200).send('Connection Estabhlished!!')
})

app.post('/speechtotext', async (req, res) => {
    
    console.log('Post request received')

    try {

        upload(req, res, async () => {

            if (req.file === undefined) {
                return res.status(404).send("No File Found. Try again")
            }

            const py = spawn('python', ['converter.py', req.file.filename.toString()])

            py.stdout.on('data', data => {
                const text = data.toString()

                console.log(text)

                if (text === "Error Occured") {
                    return res.status(500).json({'text': text})
                }

                var fileName = req.file.filename.toString()
                fileName = fileName.substring(0, fileName.indexOf('.'))+".txt"

                const file = `${__dirname}/public/textsummarization/${fileName}`
                
                res.download(file)
            })
        })
    }
    catch(ex) {
        res.status(500).send("Some error occurred. Try again")
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))