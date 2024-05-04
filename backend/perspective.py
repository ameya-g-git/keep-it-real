import cohere

def get_perspective(text):
    """
    Get alternative perspectives on a given article.

    :param text: The URL of the article.
    :return: A list of alternative perspectives.
    """
    apiKey = "rq5Zze3PLyufogK2mwfXSAw7pCy4d7YWOZVlow6a"
    co = cohere.Client(apiKey)
    response = co.chat(
        max_tokens=1000,
        # message="Please give quick alternative, contrasting perspectives on the following article link from alternative journalistic sources, provide the link to alternative perspectives as well. Format the text in this style (Text | Citation - Text 2 | Citation 2) " + text,
        message="Find 2-3 sentence alternative and contrasting perspectives from various journalistic sources, and link these in the response. Format your response for each article in this style, do not include the themes: Text | Source - Text 2 | Source 2. Please only include the data necessary. Here is the article link: " + text,
        connectors=[{"id": "web-search"}]
    )
    
    response = response.text
    response = response.split("-")

    return_data = []

    for i in range(len(response)):
        temp = response[i].split("|")
        return_data.append({"text": temp[0], "source": temp[1]})
    return return_data

perspective = get_perspective("https://www.cnn.com/2024/05/01/politics/trump-immigration-what-matters/index.html")
print(perspective)