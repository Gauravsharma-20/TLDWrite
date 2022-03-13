import sys
import os

# Bart-Large-CNN
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Pegasus
#from transformers import PegasusForConditionalGeneration, PegasusTokenizer


def read_article(file_name):
  file = open(file_name, "r")
  filedata = file.readlines()

  return filedata


def output_summary(summarize_text, file_name):
  # print("Summarize Text: \n", ". ".join(summarize_text)

  #print to file
  file1 = open(f"{os.path.dirname(os.path.realpath(__file__))}/public/textsummarization/{file_name}","w")
  file1.write(".\n".join(summarize_text))
  file1.close()


def generate_summary(file_path, file_name):
  # Read and make string of entire file
  sentences =  read_article(file_path)

  # Use Pegasus-xsum
  #tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
  #model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

  # Load tokenizer 
  tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
  
  # Load model 
  model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

  # Create tokens - number representation of our text
  tokens = tokenizer(sentences, truncation = True, padding = "longest", return_tensors = "pt")

  # Summarize 
  summarize_text = model.generate(**tokens)

  output = []

  #Trim extra characters
  summary = tokenizer.decode(summarize_text[0]).split('.')
  summary[0] = summary[0][7:]
  
  for i in range(len(summary)-1):
      output.append(summary[i].strip())

  output_summary(output, file_name)


def main(file_name = "test_sample.txt"):
  
  generate_summary(f"{os.path.dirname(os.path.realpath(__file__))}/public/speechtotext/{file_name}", file_name)


if __name__ == "__main__":
  # sys.argv.append('1636351012109.txt')
  # sys.argv.append(True)

  if sys.argv[2] == "true":
    try:
      main(sys.argv[1])
      sys.stdout.write("Success")
    except:
      sys.stdout.write("Error Occurred: summarizerV2.py")
  else:
    main(sys.argv[1])
