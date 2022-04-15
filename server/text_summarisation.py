from bson import ObjectId
# Bart-Large-CNN
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

def text_summary(fileId, fs, transcript=""):
    try:
        sentences = transcript
        
        if len(sentences) == 0:
            oid = ObjectId(fileId)
            data = fs.get(oid)
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