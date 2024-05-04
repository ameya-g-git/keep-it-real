import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

import pickle
import scipy.sparse

from web_scrape import getHTML


def clean_text(text):
    """
    Clean the text by removing special characters, numbers, and stopwords
    
    :param text: The text to be cleaned
    :return: The cleaned text
    """
    text = re.sub(r"[!@#$(),\n%^*?.'\:;~`0-9]", '', str(text)).lower()
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text, language='english', preserve_line=True)
    text = " ".join(word for word in word_tokens if not word.lower() in stop_words)
    return text


def prediction(title, text, model, cv_titles, cv_texts):
    """
    Predict the probability of the given text being reliable news
    
    :param title: The title of the article
    :param text: The text of the article
    :param model: The model used for prediction
    :param cv_titles: The CountVectorizer for the titles
    :param cv_texts: The CountVectorizer for the text
    :return: The probability of the article being fake news
    """
    title = clean_text(title)
    text = clean_text(text)
    X_title = cv_titles.transform([title])
    X_text = cv_texts.transform([text])
    X = scipy.sparse.hstack([X_title, X_text])
    return model.predict_proba(X)


file = open('data/fake_news.pickle', 'rb')
model = pickle.load(file)

file = open('data/texts_cv.pickle', 'rb')
cv_texts = pickle.load(file)

file = open('data/titles_cv.pickle', 'rb')
cv_titles = pickle.load(file)

def run(url):
    """
    Run the prediction model on the given URL
    
    :param url: The URL of the article
    :return: The probability of the article being fake news"""
    title, text = getHTML(url)
    score = prediction(title, text, model, cv_titles, cv_texts)
    return score[0][0]

# print(run('https://www.theonion.com/trump-watching-movie-on-ipad-during-trial-without-using-1851449290'))
