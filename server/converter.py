import speech_recognition as sr
import sys

def main():
  a = sys.argv[1]
  r = sr.Recognizer()

  with sr.AudioFile('./public/uploads/'+a) as source:
    audio_text = r.listen(source)

    try:
      text = r.recognize_google(audio_text)
      sys.stdout.write(text)
    except Exception as e:
      sys.stdout.write("Error Occured")

if __name__ == '__main__':
  main()