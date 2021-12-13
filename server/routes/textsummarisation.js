const express = require('express')
const multer = require('multer')
const path = require('path')
const spawn = require('child_process').spawn
const hasbin = require('hasbin')

const router = express.Router()

const storage = multer.diskStorage({
  destination: `${path.resolve('./')}/public/speechtotext`,
  filename: function(req, file, cb){
     cb(null, + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage }).single('file')

router.post("/", async(req, res) => {
  console.log('Post request received')

    try {

      upload(req, res, async () => {

        if (req.file === undefined) {
          return res.status(400).json({message:"No File Found. Try again"})
        }

        if(path.extname(req.file.filename) !== ".txt") {
          return res.status(400).json({message: "Upload only .txt files"})
        } 

        let py;
        
        if(hasbin.sync('python') === true) {
          py = spawn('python', ['summarizer.py', req.file.filename.toString(), "true"])
        }
        else if(hasbin.sync('python3') === true) {
          py = spawn('python3', ['summarizer.py', req.file.filename.toString(), "true"])
        }
        else {
          return res.status(500).send("Python not found!!! :(")
        }
          
        py.stdout.on('data', data => {
          const text = data.toString()

          console.log(text)

          if (text === "Error Occurred") {
            return res.status(500).json({message: text})
          }

          var fileName = req.file.filename.toString()
          fileName = fileName.substring(0, fileName.indexOf('.'))+".txt"

          const file = `${path.resolve('./')}/public/textsummarization/${fileName}`
          
          res.download(file)
        })
      })
    }
    catch(ex) {
      res.status(500).send("Some error occurred. Try again")
    }
})

module.exports = router