import os
import re
import joblib
import numpy as np
import pandas as pd

from scipy.sparse import hstack, csr_matrix

import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

from app.services.preprocessing import clean_text

nltk.download("vader_lexicon", quiet=True)

sia = SentimentIntensityAnalyzer()

# -------------------------------------------------
# Load Models
# -------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

model = joblib.load(os.path.join(MODEL_DIR, "review_model.pkl"))
tfidf = joblib.load(os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "feature_scaler.pkl"))

# -------------------------------------------------
# Store Predictions
# -------------------------------------------------

prediction_history = []

# -------------------------------------------------
# Prediction
# -------------------------------------------------


def predict_review(review_text: str, rating: float = 5):

    review = str(review_text)

    clean_review = clean_text(review)

    text_features = tfidf.transform([clean_review])

    review_length = len(review)
    exclamation_count = review.count("!")
    capital_count = sum(1 for c in review if c.isupper())

    words = re.findall(r"\b\w+\b", review.lower())
    repeated_words = max(len(words) - len(set(words)), 0)

    sentiment_score = sia.polarity_scores(review)["compound"]

    numeric = pd.DataFrame([{
        "review_length": review_length,
        "exclamation_count": exclamation_count,
        "capital_count": capital_count,
        "rating": rating,
        "sentiment_score": sentiment_score,
        "repeated_words": repeated_words
    }])

    numeric = scaler.transform(numeric)
    numeric = csr_matrix(numeric)

    final_features = hstack([text_features, numeric])

    prediction = model.predict(final_features)[0]
    probability = model.predict_proba(final_features)[0]

    genuine_probability = probability[0] * 100
    fake_probability = probability[1] * 100

    if prediction == 1:
        result = "Fake"
        confidence = fake_probability
    else:
        result = "Genuine"
        confidence = genuine_probability

    authenticity = genuine_probability

    if fake_probability >= 90:
        risk = "High"
    elif fake_probability >= 70:
        risk = "Medium"
    else:
        risk = "Low"

    if sentiment_score >= 0.05:
        sentiment = "Positive"
    elif sentiment_score <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    reasons = []

    if sentiment_score > 0.9:
        reasons.append("Extremely positive sentiment detected.")

    if exclamation_count >= 3:
        reasons.append("Too many exclamation marks.")

    if capital_count >= 10:
        reasons.append("Uses excessive capital letters.")

    if repeated_words >= 3:
        reasons.append("Repeated promotional words detected.")

    if review_length < 20:
        reasons.append("Very short review.")

    if not reasons:
        reasons.append("Writing pattern appears natural.")

    response = {
        "review": review,
        "prediction": result,
        "confidence": round(confidence, 2),
        "authenticity": round(authenticity, 2),
        "fake_probability": round(fake_probability, 2),
        "genuine_probability": round(genuine_probability, 2),
        "risk": risk,
        "sentiment": sentiment,
        "sentiment_score": round(sentiment_score, 3),
        "review_length": review_length,
        "capital_count": capital_count,
        "repeated_words": repeated_words,
        "exclamation_count": exclamation_count,
        "rating": rating,
        "reasons": reasons
    }

    prediction_history.append(response)

    return response


def get_all_predictions():
    return prediction_history