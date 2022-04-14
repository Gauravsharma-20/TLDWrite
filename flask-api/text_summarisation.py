from pymongo import MongoClient
import gridfs
from io import BytesIO
from bson import ObjectId

# Bart-Large-CNN
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

def read_data(fileId):
    # Estabhlish mongoDB connection
    mongoURI = f"mongodb+srv://shivam:Avengers123@mycluster.eafse.mongodb.net/TLDWrite?retryWrites=true&w=majority"

    client = MongoClient(mongoURI)
    fs = gridfs.GridFS(client['TLDWrite'], "uploads")

    oid = ObjectId(fileId)
    data = fs.get(oid)
    return data

def text_summary(fileId, transcript=""):
    try:
        sentences = transcript
        
        if len(sentences) == 0:
            data = read_data(fileId)
            sentences = data.read()

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

        print("Successful Summariser")
        return output

    except Exception as e:
        print(e)
        return "Error Occurred in Summariser"