import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

import pickle
import scipy.sparse

from web_scrape import getHTML


def clean_text(text):
    text = re.sub(r"[!@#$(),\n%^*?.'\:;~`0-9]", '', str(text)).lower()
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text, language='english', preserve_line=True)
    text = " ".join(word for word in word_tokens if not word.lower() in stop_words)
    return text


def prediction(title, text, model, cv_titles, cv_texts):
    title = clean_text(title)
    text = clean_text(text)
    X_title = cv_titles.transform([title])
    X_text = cv_texts.transform([text])
    X = scipy.sparse.hstack([X_title, X_text])
    return model.predict_proba(X)


file = open('./backend/fake_news.pickle', 'rb')
model = pickle.load(file)

file = open('./backend/texts_cv.pickle', 'rb')
cv_texts = pickle.load(file)

file = open('./backend/titles_cv.pickle', 'rb')
cv_titles = pickle.load(file)

def run(url):
    title, text = getHTML(url)
    score = prediction(title, text, model, cv_titles, cv_texts)
    return score

print(run('https://nymag.com/intelligencer/2020/10/trump-leaves-60-minutes-interview-complains-on-twitter.html')) 