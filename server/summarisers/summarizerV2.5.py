from math import ceil
import sys
import os
import math

# Pegasus
from transformers import PegasusForConditionalGeneration, PegasusTokenizer


def read_article(file_name):
    file = open(file_name, "r")
    filedata = file.readlines()
    article = filedata[0].split(". ")
    sentences = []

    for sentence in article:
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    
    return sentences

def get_papragraph_chunk_const(n):
  minCount, chunk_const = 4, 0

  if(n<=minCount):
    chunk_const = n
  else:
    chunk_const = ceil(math.pow(n,(1/(1+ceil(n/350)))))
  # elif(n>=5 and n<=10):
  #   chunk_const = math.ceil(n/2)
  # elif(n>=11 and n<=20):
  #   chunk_const = math.ceil(n/3)
  # else:
  #   chunk_const = math.ceil(n/5)

  return chunk_const


def output_summary(summarize_text, file_name):
  file1 = open(f"{os.path.dirname(os.path.realpath(__file__))}/ab/{file_name}","w")
  file1.write(".\n".join(summarize_text))
  file1.close()


def generate_summary(file_path, file_name):
  # Read and make string of entire file
  sentences =  read_article(file_path)
  
  print(len(sentences))
  
  # Use Pegasus-xsum
  tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
  model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

  output = []
  PARAGRAPH_CHUNK_CONST = get_papragraph_chunk_const(len(sentences))

  EXTRACTIVE_FACTOR = 1/ceil(len(sentences)/350)

  #Trim extra characters
  for i in range(PARAGRAPH_CHUNK_CONST):
    curr = ['. '.join(sentences[0][i*PARAGRAPH_CHUNK_CONST:(i+1)*PARAGRAPH_CHUNK_CONST])]

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
    generate_summary(f"{os.path.dirname(os.path.realpath(__file__))}/{file_name}", file_name)
    sys.stdout.write("Success: summarizerV2.5.py\n")
  except:
    sys.stdout.write("Error Occurred: summarizerV2.5.py\n")


if __name__ == "__main__":
  sys.argv.append('a.txt')
  sys.argv.append("true")

  if sys.argv[2] == "true":
    try:
      main(sys.argv[1])
      sys.stdout.write("Success: summarizerV2.5.py\n")
    except:
      sys.stdout.write("Error Occurred: summarizerV2.5.py\n")
  else:
    main(sys.argv[1])
