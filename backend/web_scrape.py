import requests
from bs4 import BeautifulSoup
import re


def getHTML(url):
    """
    Get the title and article from a given URL
    
    :param url: The URL of the article
    :return: The title and article
    """
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
