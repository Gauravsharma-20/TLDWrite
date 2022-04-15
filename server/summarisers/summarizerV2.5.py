from math import ceil
import sys
import os
import math

# Pegasus
from transformers import PegasusForConditionalGeneration, PegasusTokenizer


def read_article(file_name):
  file = open(file_name, "r")
  filedata = file.readlines()

  return filedata

def get_papragraph_chunk_const(n):
  minCount, chunk_const = 4, 0

  if(n<=minCount):
    chunk_const = n
  elif(n>=5 and n<=10):
    chunk_const = math.ceil(n/2)
  elif(n>=11 and n<=20):
    chunk_const = math.ceil(n/3)
  else:
    chunk_const = math.ceil(n/5)

  return chunk_const


def output_summary(summarize_text, file_name):
  file1 = open(f"{os.path.dirname(os.path.realpath(__file__))}/public/textsummarization/{file_name}","w")
  file1.write(".\n".join(summarize_text))
  file1.close()


def generate_summary(file_path, file_name):
  # Read and make string of entire file
  sentences =  read_article(file_path)
  sen = []

  for sentence in sentences:
    sen.append(sentence.replace("[^a-zA-Z]", " ").split("."))
  # sen = sentences[0].split('.')
  
  # Use Pegasus-xsum
  tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
  model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

  output = []
  PARAGRAPH_CHUNK_CONST = get_papragraph_chunk_const(len(sen))
  #Trim extra characters
  for i in range(PARAGRAPH_CHUNK_CONST):
    curr = ['. '.join(sen[0][i*PARAGRAPH_CHUNK_CONST:(i+1)*PARAGRAPH_CHUNK_CONST])]

    tokens = tokenizer(curr, truncation = True, padding = "longest", return_tensors = "pt")
    summarize_text = model.generate(**tokens)
    
    summary = tokenizer.decode(summarize_text[0]).split('.')
    
    for i in range(len(summary)):
      currSummary = summary[i].strip()
      if len(currSummary)>2: 
        output.append(summary[i].strip())
  print(output)
  output_summary(output, file_name)


def main(file_name = "test_sample.txt"):
  try:
    sys.stdout.write('Summarizer Started\n')
    generate_summary(f"{os.path.dirname(os.path.realpath(__file__))}/public/speechtotext/{file_name}", file_name)
    sys.stdout.write("Success: summarizerV2.5.py\n")
  except:
    sys.stdout.write("Error Occurred: summarizerV2.5.py\n")


if __name__ == "__main__":
  sys.argv.append('PEC.txt')
  sys.argv.append("true")

  if sys.argv[2] == "true":
    try:
      main(sys.argv[1])
      sys.stdout.write("Success: summarizerV2.5.py\n")
    except:
      sys.stdout.write("Error Occurred: summarizerV2.5.py\n")
  else:
    main(sys.argv[1])
