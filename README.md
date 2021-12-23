# TLDWrite <a href="http://tld-write.herokuapp.com/" target="_blank">[Live]</a>

## Overview
Meeting summarizer to generate important points and actionables from any meeting, lecture and transcript.

## Aim & Abstract
Meeting Summarisation is a way of effectively capturing the important details of any meeting for the ones who missed it and also to provide a better and concise summary to the concerned people. In almost all of modern meetings there are dedicated professionals just for the task of making notes of meeting and writing minutes of meeting. Often, they can, due to human error, miss out on certain important conversation points of the meetings. Additionally, this necessity of a dedicated individual facilitates the need of innovation. Innovation involves bringing ideas and technology together to ease the task of humans in every sphere of life.  

Thus, Final aim of this project is to build a Web App, Mobile App, Browser extension and Desktop application that can generate summary of any meeting from the audio of that meeting. As this project is currently the version-1 of our effort in this area, this project heavily uses the utilities like Web APIs, Cosine Similarity, tensorflow, keras and CNN-1D. A Web App with our proposed features has been made by us, which uses MERN stack with python for data manipulation operations.  

System contains 3 major features in this website namely, Speech-to-Text, Text Summarisation and Speech Summarisation. The version-1 of speech to text uses google web apis for conversion. The version-2 of speech to text is implemented using CNN which has four CONV1D layers and 2 dense layers and takes input as the spectrogram of speech audio. Version-1 of Text Summarisation uses the Cosine Similarity method to determine the sentences which provide the most amount of information to our final output. On an average we are able to decrease the textual content to 33.61% of the input through this method.  




## How to Use
### Install Server Dependencies
1. Open terminal in server folder directory.
2. Run `npm i`.
3. Run `pip install -r requirements.txt`.

### Run Server
1. Run `node index.js` or `nodemon index.js` in server directory.

### Install Client Dependencies
1. Open terminal in client folder directory.
2. Run `npm i`.

### Run Client
1. Run `npm start` in client directory.

### install nltk stopwords
1. Open python command Line Interface write python3(unix) or python
2. `import nltk`
3. `nltk.download("stopwords")`
