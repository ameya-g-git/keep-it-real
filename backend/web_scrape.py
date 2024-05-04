import requests
from bs4 import BeautifulSoup
import re


def getHTML(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    title = soup.title.string

    article = ""
    body = soup.find_all("p")
    for p_tag in body:
        text = p_tag.get_text()
        if len(text.split()) < 20:
            continue
        article += text

    final = re.sub(r"[\n]", '', str(article)).lower()
    final = re.sub(' +', ' ', final)
    return title, final


print(getHTML(r'https://www.cnn.com/2024/05/04/politics/access-hollywood-trump-what-matters/index.html'))