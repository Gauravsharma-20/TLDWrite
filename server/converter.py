import speech_recognition as sr
import os 
import sys
from pydub import AudioSegment
from pydub.silence import split_on_silence
import summarizer
import summarizerV2
import shutil

try:

  dir_path = os.path.dirname(os.path.realpath(__file__))

  fileName = sys.argv[1]
  r = sr.Recognizer()

  path = f"{dir_path}/public/uploads/{fileName}"
  sound = AudioSegment.from_wav(path)

  # split audio sound where silence is 700 miliseconds or more and get chunks
  chunks = split_on_silence(sound,
    # experiment with this value for your target audio file
    min_silence_len = 500,
    # adjust this per requirement
    silence_thresh = sound.dBFS-14,
    # keep the silence for 1 second, adjustable as well
    keep_silence=500,
  )

  folder_name = f"{dir_path}/public/audio-chunks"

  # create a directory to store the audio chunks
  if not os.path.isdir(folder_name):
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
        text = r.recognize_google(audio_listened)
      except sr.UnknownValueError as e:
        sys.stdout.write("Chunk parsing error: "+str(e))
      else:
        text = f"{text.capitalize()}. "
        whole_text += text

  txtFileName = fileName[0:fileName.index('.')]+".txt"
  file = open(f"{dir_path}/public/speechtotext/{txtFileName}", "w")
  file.write(whole_text)
  file.close()

  if sys.argv[2] != "false":
    summarizer.main(txtFileName)
  sys.stdout.write("Success")
  shutil.rmtree(folder_name)
except:
  shutil.rmtree(folder_name)
  sys.stdout.write("Error Occurred")