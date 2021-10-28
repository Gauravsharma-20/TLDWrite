import speech_recognition as sr
import sys
import summarizer

def main():
  a = sys.argv[1]
  r = sr.Recognizer()

  with sr.AudioFile('./public/uploads/'+a) as source:
    audio_text = r.listen(source)

    try:
      text = r.recognize_google(audio_text)

      file = open('./public/speechtotext/'+a[0:a.index('.')]+'.txt', "w")
      file.write(text)
      file.close()

      summarizer.main(a[0:a.index('.')]+'.txt')

      sys.stdout.write("Success")
    except Exception as e:
      sys.stdout.write("Error Occured")

if __name__ == '__main__':
  main()