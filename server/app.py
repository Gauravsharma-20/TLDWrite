from flask import Flask, jsonify, request
from speech_to_text import automatic_speech_recognition
from text_summarisation import text_summary
from pymongo import MongoClient
import gridfs

mongoURI = f"mongodb+srv://shivam:Avengers123@mycluster.eafse.mongodb.net/TLDWrite?retryWrites=true&w=majority"
client = MongoClient(mongoURI)
fs = gridfs.GridFS(client['TLDWrite'], "uploads")

app = Flask(__name__)

@app.route("/")
def homepage():
    return "HELLO"

@app.route("/speechtotext", methods=['POST'])
def speechToText():
    fileId = fs.put(request.files['file'], filename=request.files['file'].filename, content_type=request.files['file'].content_type)
    speechTranscript = automatic_speech_recognition(fileId, fs)
    fs.delete(fileId)
    response = jsonify(speechTranscript)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/textsummarisation", methods=['POST'])
def textSummarisation():
    fileId = fs.put(request.files['file'], filename=request.files['file'].filename, content_type=request.files['file'].content_type)
    textSummary = text_summary(fileId, fs)
    fs.delete(fileId)
    response = jsonify(textSummary)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/meetingsummarisation", methods=['POST'])
def meetingSummarisation():
    fileId = fs.put(request.files['file'], filename=request.files['file'].filename, content_type=request.files['file'].content_type)
    speechTranscript = automatic_speech_recognition(fileId, fs)
    textSummary = text_summary(fileId, fs, speechTranscript)
    fs.delete(fileId)
    response = jsonify(textSummary)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)