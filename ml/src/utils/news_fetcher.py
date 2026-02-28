# src/utils/news_fetcher.py

import requests

NEWS_API_KEY = "d4ef2aa05e3c462dbc13139e6c7fc60c"

TRUSTED_SOURCES = [
    "bbc-news",
    "reuters",
    "the-hindu",
    "cnn",
    "the-times-of-india"
]

def fetch_latest_news(query="india"):
    url = "https://newsapi.org/v2/top-headlines"

    params = {
        "q": query,
        "language": "en",
        "pageSize": 5,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(url, params=params, timeout=10)
    data = response.json()

    articles = []
    for a in data.get("articles", []):
        articles.append({
            "source": a["source"]["name"],
            "title": a["title"],
            "content": a["description"] or ""
        })

    return articles


# 🔍 CHECK IF NEWS EXISTS IN TRUSTED SOURCES
def news_exists(text: str) -> bool:
    url = "https://newsapi.org/v2/everything"

    params = {
        "q": text,
        "language": "en",
        "sources": ",".join(TRUSTED_SOURCES),
        "pageSize": 5,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(url, params=params, timeout=10)
    data = response.json()

    articles = data.get("articles", [])
    if not articles:
        return False

    text = text.lower()

    for a in articles:
        title = (a.get("title") or "").lower()
        content = (a.get("description") or "").lower()

        # 🔴 IMPORTANT: claim matching
        if text in title or text in content:
            return True

    return False
