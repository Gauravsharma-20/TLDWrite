from io import BytesIO
import shutil
import speech_recognition as sr
import os 
import sys
from bson import ObjectId
from pydub import AudioSegment
from pydub.silence import split_on_silence
from pymongo import MongoClient
import gridfs

def read_data(fileId):
    # Estabhlish mongoDB connection
    mongoURI = f"mongodb+srv://shivam:Avengers123@mycluster.eafse.mongodb.net/TLDWrite?retryWrites=true&w=majority"

    client = MongoClient(mongoURI)
    fs = gridfs.GridFS(client['TLDWrite'], "uploads")

    oid = ObjectId(fileId)
    data = fs.get(oid)
    return data
    
def automatic_speech_recognition(fileId):
    try:

        data = read_data(fileId)
        
        dir_path = os.path.dirname(os.path.realpath(__file__))
        r = sr.Recognizer()

        sound = AudioSegment.from_wav(BytesIO(data.read()))
        if data.contentType == "audio/mp3":
            sound = AudioSegment.from_mp3(BytesIO(data.read()))

        # split audio sound where silence is 700 miliseconds or more and get chunks
        chunks = split_on_silence(sound,
            # experiment with this value for your target audio file
            min_silence_len = 500,
            # adjust this per requirement
            silence_thresh = sound.dBFS-14,
            # keep the silence for 1 second, adjustable as well
            keep_silence=500,
        )

        folder_name = f"{dir_path}/audio-chunks"

        # create a directory to store the audio chunks
        if not os.path.isdir(folder_name):
            os.mkdir(folder_name)
        else:
            shutil.rmtree(folder_name)
            os.mkdir(folder_name)

        whole_text = ""

        # process each chunk 
        for i, audio_chunk in enumerate(chunks, start=1):
            # export audio chunk and save it in
            # the `folder_name` directory.
            chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
            audio_chunk.export(chunk_filename, format="wav")
            # recognize the chunk
            with sr.AudioFile(chunk_filename) as source:
                audio_listened = r.record(source)
                # try converting it to text
                try:
                    text = r.recognize_google(audio_listened, language='en-IN')
                except sr.UnknownValueError as e:
                    sys.stdout.write("Chunk parsing error: "+str(e))
                else:
                    text = f"{text.capitalize()}. "
                    whole_text += text

        print("Successful ASR")
        shutil.rmtree(folder_name)
        return whole_text
    except Exception as e:
        print(e)
        return "Error Occurred in ASR"