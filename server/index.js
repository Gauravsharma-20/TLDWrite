const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

const speechRoute = require('./routes/speechtotext')
const meetingRoute = require('./routes/meetingsummarisation')
const summaryRoute = require('./routes/textsummarisation')

const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

app.use(bodyParser.json());
app.use(express.static('public'))

const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
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

global.upload = multer({ storage });

app.use('/speechtotext', speechRoute)
app.use('/meetingsummarisation', meetingRoute)
app.use('/textsummarisation', summaryRoute)

const PORT = process.env.PORT || 5000

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
        .catch((err) => console.log(err))