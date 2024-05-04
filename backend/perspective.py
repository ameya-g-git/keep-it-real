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
        max_tokens=2000,
        message="Find 2-3 sentence alternative and contrasting perspectives from various journalistic sources, and link these in the response. Format your response for each article in this style, do not include the themes: Text | Source _ Text 2 | Source 2. Please only include the data necessary. Here is the article link: " + text,
        connectors=[{"id": "web-search"}]
    )
    
    response = response.text
    response = response.split("_")
    # print(response)

    return_data = []

    # Format the response to {text: "text", source: "source"}
    for i in range(len(response)):
        temp = response[i].split("|")
        # print(temp)
        return_data.append({"text": str(temp[0]), "source": str(temp[1])})
    # print(return_data)
    return return_data

# perspective = get_perspective("https://www.cnn.com/2024/05/01/politics/trump-immigration-what-matters/index.html")
# print(perspective)