const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const path = require('path')
const axios = require('axios')
const mongodb = require('mongodb')

const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

app.use(bodyParser.json())

const mongoURI = "mongodb+srv://shivam:Avengers123@mycluster.eafse.mongodb.net/TLDWrite?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: {useUnifiedTopology: true},
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

upload = multer({ storage: storage});

app.post('/speechtotext', async(req, res) => {
  console.log("Post request received: ASR")

  try {
    upload.single('file')(req, res, async() => {
      
      console.log('File Uploaded')
        console.log(req.file)
      if (req.file === undefined) {
        return res.status(400).json({message:"No File Found. Try again"})
      }

      if(path.extname(req.file.filename) !== ".wav") {
        // delete file
        console.log('Deletion Started')

        const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
        await bucket.delete(req.file.id);

        console.log('Deletion Completed')

        return res.status(400).json({message: "Upload only .wav files"})
      }

      console.log('Request sent to Flask API')

      let url = `http://localhost:8080/speechtotext/${req.file.id}`
      const response = await axios.get(url)

      console.log('Response received from flask')
      console.log('Deletion Started')

      // delete file
      const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
      await bucket.delete(req.file.id);

      console.log('Deletion Completed')
      
      return res.status(200).json({content: response.data})
    })
  }
  catch(exception) {
    console.log(exception)
    res.status(400).send(exception)
  }
})

app.post('/textsummarisation', async(req, res) => {
  console.log("Post request received: Summarisation")

  try {
    upload.single('file')(req, res, async() => {

      if (req.file === undefined) {
        return res.status(400).json({message:"No File Found. Try again"})
      }

      if(path.extname(req.file.filename) !== ".txt") {
        console.log('Deletion Started');
        // delete file
        const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
        await bucket.delete(req.file.id);
        
        console.log('Deletion Ended');

        return res.status(400).json({message: "Upload only .txt files"})
      }

      let url = `http://localhost:8080/textsummarisation/${req.file.id}`
      const response = await axios.get(url)

      // delete file
      console.log('Deletion Started');
      
      const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
      await bucket.delete(req.file.id);
      
      console.log('Deletion Ended');

      return res.status(200).json({content: response.data})
    })
  }
  catch(exception) {
    res.status(400).send(exception)
  }
})

app.post('/meetingsummarisation', async(req, res) => {
  console.log("Post request received: Meeting Summarisation")

  try {
    upload.single('file')(req, res, async() => {

      if (req.file === undefined) {
        return res.status(400).json({message:"No File Found. Try again"})
      }

      if(path.extname(req.file.filename) !== ".wav") {
        console.log('Deletion Started');

        const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
        await bucket.delete(req.file.id);

        console.log('Deletion Ended');
        
        return res.status(400).json({message: "Upload only .wav files"})
      }

      let url = `http://localhost:8080/meetingsummarisation/${req.file.id}`
      const response = await axios.get(url)

      console.log('Deletion Started');
      
      const bucket = new mongodb.GridFSBucket(conn.db, { bucketName: 'uploads' });
      await bucket.delete(req.file.id);

      console.log('Deletion Ended');

      return res.status(200).json({content: response.data})
    })
  }
  catch(exception) {
    res.status(400).send(exception)
  }
})

// app.get('/', async(req, res) => {
//     gfs.files.findOne({filename: 'ccde9af0eaf362bc93d7cf52fc530df9.wav'}, (err, file) => {
//         if(!file) return res.send("No File Found!!!")
//         res.send(file)
//     });
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))