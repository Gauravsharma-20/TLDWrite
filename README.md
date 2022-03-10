# TLDWrite <a href="http://tld-write.herokuapp.com/" target="_blank">[Live]</a>

## Overview
Meeting summarizer to generate important points and actionables from any meeting, lecture and transcript.

## Aim & Abstract
Meeting Summarisation is a way of effectively capturing the important details of any meeting for the ones who missed it and also to provide a better and concise summary to the concerned people. In almost all of modern meetings there are dedicated professionals just for the task of making notes of meeting and writing minutes of meeting. Often, they can, due to human error, miss out on certain important conversation points of the meetings. Additionally, this necessity of a dedicated individual facilitates the need of innovation. Innovation involves bringing ideas and technology together to ease the task of humans in every sphere of life.  

Thus, Final aim of this project is to build a Web App, Mobile App, Browser extension and Desktop application that can generate summary of any meeting from the audio of that meeting. As this project is currently the version-1 of our effort in this area, this project heavily uses the utilities like Web APIs, Cosine Similarity, tensorflow, keras and CNN-1D. A Web App with our proposed features has been made by us, which uses MERN stack with python for data manipulation operations.  

System contains 3 major features in this website namely, Speech-to-Text, Text Summarisation and Speech Summarisation. The version-1 of speech to text uses google web apis for conversion. The version-2 of speech to text is implemented using CNN which has four CONV1D layers and 2 dense layers and takes input as the spectrogram of speech audio. Version-1 of Text Summarisation uses the Cosine Similarity method to determine the sentences which provide the most amount of information to our final output. On an average we are able to decrease the textual content to 33.61% of the input through this method.  

## Demo
&nbsp;&nbsp;&nbsp;&nbsp;<img src="./resources/Demo.gif" width="85%" height="70%"><br>

## How to Use
### Install Server Dependencies
1. Open terminal in server folder directory.
2. Run `npm i`.
3. Run `pip install -r requirements.txt`.
4. Run `pip install torch==1.8.2+cu111 torchvision==0.9.2+cu111 torchaudio===0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html`

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


## References 
[1] P. Dubey, Understand Text Summarization and create your own summarizer in python, Towards Data Science, Dec 23, 2018. Accessed on: Oct 20, 2021. [Online]. Available: https://towardsdatascience.com/understand-text-summarization-and-create-your-own-summarizer-in-python-b26a9f09fc70 

[2] M. Allahyari, Text Summarization Techniques: A Brief Survey, July 28, 2017. Accessed on: Oct. 22, 2021 [Online]. Available: https://arxiv.org/abs/1703.09902v1  

[3] V. Gudivada, Text Summarization, ScienceDirect, 2018. Accessed on: Nov. 2, 2021 [Online]. Available: https://www.sciencedirect.com/topics/computer-science/text-summarization  

[4] A. Pai, Learn How to Build your own Speech-to-Text Model (using Python), AnalyticsVidhya, July 15, 2019. Accessed on: Oct. 22, 2021 [Online]. Available: https://www.analyticsvidhya.com/blog/2019/07/learn-build-first-speech-to-text-model-python/  

[5] I. Papastratis, Speech Recognition: a review of the different deep learning approaches, AI Summer, July 14, 2021. Accessed on: Oct. 24, 2021 [Online]. Available: https://theaisummer.com/speech-recognition/  

[6] Y. Zhang, J. Qin, W. Han, Pushing the limits of Semi-supervised learning for Automatic Speech Recognition, Oct. 20, 2020. Accessed on: Nov. 13, 2021 [Online]. Available: https://arxiv.org/pdf/2010.10504v1.pdf  

[7] K. Doshi, Audio Deep Learning Made Simple: Automatic Speech Recognition (ASR), How it Works, Towards Data Science, Mar. 26, 2021. Accessed on: Nov. 1, 2021 [Online]. Available: https://towardsdatascience.com/audio-deep-learning-made-simple-automatic-speech-recognition-asr-how-it-works-716cfce4c706  

[8] D. Gaikwad, C. Mahender, A Review Paper on Text Summarization, IJARCCE, Mar. 2016. Accessed on: Nov. 20, 2021 [Online]. Available: https://www.ijarcce.com/upload/2016/march-16/IJARCCE%2040.pdf  
