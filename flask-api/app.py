from enum import auto
from flask import Flask, jsonify
from speech_to_text import automatic_speech_recognition
from text_summarisation import text_summary

app = Flask(__name__)

@app.route("/")
def homepage():
    return "HELLO"

@app.route("/speechtotext/<fileId>", methods=['GET'])
def speechToText(fileId):
    speechTranscript = automatic_speech_recognition(fileId)
    return jsonify(speechTranscript)

@app.route("/textsummarisation/<fileId>", methods=['GET'])
def textSummarisation(fileId):
    textSummary = text_summary(fileId)
    return jsonify(textSummary)

@app.route("/meetingsummarisation/<fileId>", methods=['GET'])
def meetingSummarisation(fileId):
    speechTranscript = automatic_speech_recognition(fileId)
    textSummary = text_summary(fileId, speechTranscript)
    return jsonify(textSummary)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)