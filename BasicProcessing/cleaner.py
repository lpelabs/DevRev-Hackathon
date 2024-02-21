import nltk
nltk.download('punkt')  
import re
nltk.download('stopwords')  # one time execution
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
def clean_text(text):
    sentence = sent_tokenize(text)
    corpus = []
    for i in range(len(sentence)):
        sen = re.sub('[^a-zA-Z]', " ", sentence[i])  
        sen = sen.lower()                            
        sen = sen.split()                         
        sen = ' '.join([i for i in sen if i not in stopwords.words('english')])   
        corpus.append(sen)
    return corpus
    