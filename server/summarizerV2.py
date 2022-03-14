import sys
import os

# Bart-Large-CNN
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


def read_article(file_name):
  file = open(file_name, "r")
  filedata = file.readlines()

  return filedata


def output_summary(summarize_text, file_name):
  file1 = open(f"{os.path.dirname(os.path.realpath(__file__))}/public/textsummarization/{file_name}","w")
  file1.write(".\n".join(summarize_text))
  file1.close()


def generate_summary(file_path, file_name):
  # Read and make string of entire file
  sentences =  read_article(file_path)

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
  try:
    sys.stdout.write('Summarizer Started\n')
    generate_summary(f"{os.path.dirname(os.path.realpath(__file__))}/public/speechtotext/{file_name}", file_name)
    sys.stdout.write("Success: summarizerV2.py\n")
  except:
    sys.stdout.write("Error Occurred: summarizerV2.py\n")


if __name__ == "__main__":
  # sys.argv.append('msft.txt')
  # sys.argv.append("true")

  if sys.argv[2] == "true":
    try:
      main(sys.argv[1])
      sys.stdout.write("Success: summarizerV2.py\n")
    except:
      sys.stdout.write("Error Occurred: summarizerV2.py\n")
  else:
    main(sys.argv[1])
