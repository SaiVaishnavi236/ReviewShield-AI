import re

from nltk.sentiment import SentimentIntensityAnalyzer

sia=SentimentIntensityAnalyzer()

def extract_features(review):

    review_length=len(review)

    exclamation_count=review.count("!")

    capital_count=sum(
        1 for c in review if c.isupper()
    )

    words=re.findall(r"\b\w+\b",review.lower())

    repeated_words=len(words)-len(set(words))

    sentiment=sia.polarity_scores(review)["compound"]

    return {

        "review_length":review_length,

        "exclamation_count":exclamation_count,

        "capital_count":capital_count,

        "repeated_words":repeated_words,

        "sentiment_score":sentiment

    }