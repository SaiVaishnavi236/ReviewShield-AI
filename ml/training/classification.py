# ============================================================
# REVIEWSHIELD AI - FAKE REVIEW DETECTION
# ============================================================
# Dataset:
# public_reviews_dataset_cleaned.csv
#
# Model:
# TF-IDF + Linguistic Features + Sentiment
#                    +
#            Logistic Regression
#
# Output:
# 0 = Genuine / Not Spam
# 1 = Fake / Spam
# ============================================================


# ============================================================
# 1. IMPORT LIBRARIES
# ============================================================

import pandas as pd
import numpy as np
import re
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

from scipy.sparse import hstack, csr_matrix

import nltk
from nltk.sentiment import SentimentIntensityAnalyzer


# ============================================================
# 2. DOWNLOAD VADER SENTIMENT LEXICON
# ============================================================

nltk.download("vader_lexicon")


# ============================================================
# 3. DATASET FILE
# ============================================================

CSV_FILE = "public_reviews_dataset_cleaned.csv"


# ============================================================
# 4. EXACT COLUMN NAMES FROM YOUR DATASET
# ============================================================

REVIEW_COLUMN = "review_text"

RATING_COLUMN = "review_rating"

LABEL_COLUMN = "reviewer_classified_fake"


# ============================================================
# 5. LOAD DATASET
# ============================================================

print("\nLoading dataset...")

df = pd.read_csv(
    CSV_FILE,
    low_memory=False
)

print("\nDataset loaded successfully!")

print("Number of rows    :", len(df))
print("Number of columns :", len(df.columns))


# ============================================================
# 6. DISPLAY DATASET COLUMNS
# ============================================================

print("\n========== DATASET COLUMNS ==========")

for i, column in enumerate(df.columns):
    print(i, ":", column)


# ============================================================
# 7. CHECK REQUIRED COLUMNS
# ============================================================

required_columns = [
    REVIEW_COLUMN,
    RATING_COLUMN,
    LABEL_COLUMN
]

for column in required_columns:

    if column not in df.columns:

        raise ValueError(
            f"\nERROR: Column '{column}' was not found "
            f"in the dataset."
        )


print("\nRequired columns found successfully!")


# ============================================================
# 8. RENAME COLUMNS
# ============================================================

df = df.rename(
    columns={
        REVIEW_COLUMN: "review_text",
        RATING_COLUMN: "rating",
        LABEL_COLUMN: "label"
    }
)


print("\n========== COLUMNS USED BY MODEL ==========")

print("Review text :", "review_text")
print("Rating      :", "rating")
print("Label       :", "label")


# ============================================================
# 9. CHECK ORIGINAL LABEL VALUES
# ============================================================

print("\n========== ORIGINAL LABEL VALUES ==========")

print(
    df["label"].value_counts(
        dropna=False
    )
)


# ============================================================
# 10. CONVERT LABEL TO 0 / 1
# ============================================================
#
# TRUE  -> 1 -> Fake / Spam
# FALSE -> 0 -> Genuine / Not Spam
#
# ============================================================

def convert_label(value):

    if pd.isna(value):
        return np.nan

    value = str(value).strip().upper()

    if value == "TRUE":
        return 1

    elif value == "FALSE":
        return 0

    else:
        return np.nan


df["label"] = df["label"].apply(
    convert_label
)


# ============================================================
# 11. REMOVE INVALID LABELS
# ============================================================

before_label_filter = len(df)

df = df.dropna(
    subset=["label"]
)

df["label"] = df["label"].astype(int)

after_label_filter = len(df)

print("\nRows before label filtering :", before_label_filter)
print("Rows after label filtering  :", after_label_filter)


# ============================================================
# 12. DISPLAY FINAL LABEL DISTRIBUTION
# ============================================================

print("\n========== FINAL LABEL DISTRIBUTION ==========")

print(
    df["label"].value_counts()
)

print("\n0 = Genuine / Not Spam")
print("1 = Fake / Spam")


# ============================================================
# 13. HANDLE MISSING REVIEW TEXT
# ============================================================

df["review_text"] = (
    df["review_text"]
    .fillna("")
    .astype(str)
)


# Remove completely empty reviews

df = df[
    df["review_text"].str.strip() != ""
]


print(
    "\nRows after removing empty reviews:",
    len(df)
)


# ============================================================
# 14. TEXT PREPROCESSING
# ============================================================

def clean_text(text):

    # Convert to string
    text = str(text)

    # Convert to lowercase
    text = text.lower()

    # Remove HTML tags
    text = re.sub(
        r"<.*?>",
        " ",
        text
    )

    # Remove URLs
    text = re.sub(
        r"http\S+|www\S+",
        " ",
        text
    )

    # Keep alphabets and ! ?
    text = re.sub(
        r"[^a-zA-Z\s!?]",
        " ",
        text
    )

    # Remove extra spaces
    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


print("\nCleaning review text...")

df["clean_review"] = (
    df["review_text"]
    .apply(clean_text)
)


# ============================================================
# 15. FEATURE 1 - REVIEW LENGTH
# ============================================================

df["review_length"] = (
    df["review_text"]
    .apply(
        lambda x: len(str(x))
    )
)


# ============================================================
# 16. FEATURE 2 - EXCLAMATION COUNT
# ============================================================

df["exclamation_count"] = (
    df["review_text"]
    .apply(
        lambda x: str(x).count("!")
    )
)


# ============================================================
# 17. FEATURE 3 - CAPITAL LETTER COUNT
# ============================================================

df["capital_count"] = (
    df["review_text"]
    .apply(
        lambda x: sum(
            1
            for character in str(x)
            if character.isupper()
        )
    )
)


# ============================================================
# 18. FEATURE 4 - REPEATED WORD COUNT
# ============================================================

def count_repeated_words(text):

    words = re.findall(
        r"\b\w+\b",
        str(text).lower()
    )

    if len(words) == 0:
        return 0

    repeated_words = (
        len(words)
        - len(set(words))
    )

    return repeated_words


df["repeated_words"] = (
    df["review_text"]
    .apply(
        count_repeated_words
    )
)


# ============================================================
# 19. FEATURE 5 - SENTIMENT SCORE
# ============================================================

print("\nCalculating sentiment scores...")

sia = SentimentIntensityAnalyzer()


def get_sentiment(text):

    score = sia.polarity_scores(
        str(text)
    )

    return score["compound"]


df["sentiment_score"] = (
    df["review_text"]
    .apply(
        get_sentiment
    )
)


# ============================================================
# 20. CONVERT RATING TO NUMERIC
# ============================================================

df["rating"] = pd.to_numeric(
    df["rating"],
    errors="coerce"
)


# ============================================================
# 21. NUMERICAL FEATURES
# ============================================================

numerical_features = [

    "review_length",

    "exclamation_count",

    "capital_count",

    "rating",

    "sentiment_score",

    "repeated_words"

]


# ============================================================
# 22. HANDLE MISSING NUMERICAL VALUES
# ============================================================

for column in numerical_features:

    df[column] = pd.to_numeric(
        df[column],
        errors="coerce"
    )

    df[column] = (
        df[column]
        .fillna(0)
    )


# ============================================================
# 23. DEFINE INPUT X AND TARGET Y
# ============================================================

X_text = df["clean_review"]

y = df["label"]


print("\n========== FINAL DATA ==========")

print(
    "Total reviews:",
    len(df)
)

print(
    "Genuine reviews:",
    sum(y == 0)
)

print(
    "Fake reviews:",
    sum(y == 1)
)


# ============================================================
# 24. TRAIN / TEST SPLIT
# ============================================================

print("\nSplitting dataset...")

(
    X_train_text,
    X_test_text,
    y_train,
    y_test,
    train_index,
    test_index
) = train_test_split(

    X_text,

    y,

    df.index,

    test_size=0.20,

    random_state=42,

    stratify=y
)


print(
    "\nTraining samples:",
    len(X_train_text)
)

print(
    "Testing samples :",
    len(X_test_text)
)


# ============================================================
# 25. TF-IDF VECTORIZATION
# ============================================================

print("\nCreating TF-IDF features...")


tfidf = TfidfVectorizer(

    max_features=10000,

    ngram_range=(1, 2),

    min_df=2,

    sublinear_tf=True

)


# Fit ONLY on training data

X_train_tfidf = (
    tfidf.fit_transform(
        X_train_text
    )
)


# Transform test data

X_test_tfidf = (
    tfidf.transform(
        X_test_text
    )
)


print(
    "\nTF-IDF training shape:",
    X_train_tfidf.shape
)

print(
    "TF-IDF testing shape :",
    X_test_tfidf.shape
)


# ============================================================
# 26. GET NUMERICAL FEATURES
# ============================================================

X_train_numeric = (
    df.loc[
        train_index,
        numerical_features
    ]
)


X_test_numeric = (
    df.loc[
        test_index,
        numerical_features
    ]
)


# ============================================================
# 27. STANDARDIZE NUMERICAL FEATURES
# ============================================================

print("\nScaling numerical features...")


scaler = StandardScaler()


X_train_numeric_scaled = (
    scaler.fit_transform(
        X_train_numeric
    )
)


X_test_numeric_scaled = (
    scaler.transform(
        X_test_numeric
    )
)


# Convert to sparse matrices

X_train_numeric_sparse = csr_matrix(
    X_train_numeric_scaled
)


X_test_numeric_sparse = csr_matrix(
    X_test_numeric_scaled
)


# ============================================================
# 28. COMBINE TF-IDF + NUMERICAL FEATURES
# ============================================================

print("\nCombining features...")


X_train_final = hstack([

    X_train_tfidf,

    X_train_numeric_sparse

])


X_test_final = hstack([

    X_test_tfidf,

    X_test_numeric_sparse

])


print(
    "\nFinal training feature shape:",
    X_train_final.shape
)

print(
    "Final testing feature shape :",
    X_test_final.shape
)


# ============================================================
# 29. TRAIN LOGISTIC REGRESSION
# ============================================================

print("\nTraining Logistic Regression...")


model = LogisticRegression(

    max_iter=1000,

    class_weight="balanced",

    random_state=42

)


model.fit(

    X_train_final,

    y_train

)


print(
    "\nModel training completed successfully!"
)


# ============================================================
# 30. MAKE PREDICTIONS
# ============================================================

print("\nMaking predictions...")


y_pred = model.predict(
    X_test_final
)


y_probability = (
    model.predict_proba(
        X_test_final
    )
)


# ============================================================
# 31. MODEL EVALUATION
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)


precision = precision_score(
    y_test,
    y_pred,
    zero_division=0
)


recall = recall_score(
    y_test,
    y_pred,
    zero_division=0
)


f1 = f1_score(
    y_test,
    y_pred,
    zero_division=0
)


# ============================================================
# 32. DISPLAY RESULTS
# ============================================================

print("\n")
print("=" * 60)

print(
    "             REVIEWSHIELD AI RESULTS"
)

print("=" * 60)


print(
    f"Accuracy  : {accuracy:.4f}"
)


print(
    f"Precision : {precision:.4f}"
)


print(
    f"Recall    : {recall:.4f}"
)


print(
    f"F1 Score  : {f1:.4f}"
)


print("=" * 60)


# ============================================================
# 33. CLASSIFICATION REPORT
# ============================================================

print("\n========== CLASSIFICATION REPORT ==========\n")


print(
    classification_report(

        y_test,

        y_pred,

        target_names=[

            "Genuine / Not Spam",

            "Fake / Spam"

        ],

        zero_division=0

    )
)


# ============================================================
# 34. CONFUSION MATRIX
# ============================================================

print("\n========== CONFUSION MATRIX ==========\n")


cm = confusion_matrix(

    y_test,

    y_pred

)


print(cm)


# ============================================================
# 35. SAVE TRAINED MODEL
# ============================================================

print("\nSaving trained model...")


joblib.dump(

    model,

    "review_model.pkl"

)


# ============================================================
# 36. SAVE TF-IDF VECTORIZER
# ============================================================

joblib.dump(

    tfidf,

    "tfidf_vectorizer.pkl"

)


# ============================================================
# 37. SAVE SCALER
# ============================================================

joblib.dump(

    scaler,

    "feature_scaler.pkl"

)


# ============================================================
# 38. SAVE FEATURE INFORMATION
# ============================================================

feature_information = {

    "text_column": "review_text",

    "rating_column": "rating",

    "label_column": "label",

    "numerical_features":
        numerical_features,

    "label_mapping": {

        0: "Genuine / Not Spam",

        1: "Fake / Spam"

    }

}


joblib.dump(

    feature_information,

    "feature_information.pkl"

)


# ============================================================
# 39. FINAL MESSAGE
# ============================================================

print("\n")
print("=" * 60)

print(
    "        REVIEWSHIELD AI TRAINING COMPLETE"
)

print("=" * 60)


print("\nSaved files:")

print("1. review_model.pkl")
print("2. tfidf_vectorizer.pkl")
print("3. feature_scaler.pkl")
print("4. feature_information.pkl")


print("\nYour model is ready!")

print("\nLabel mapping:")

print("0 = Genuine / Not Spam")

print("1 = Fake / Spam")

print("=" * 60)
# ============================================================
# LIVE REVIEW PREDICTION
# ============================================================

print("\n" + "=" * 60)
print("          REVIEWSHIELD AI - LIVE REVIEW CHECK")
print("=" * 60)

def predict_review(review_text, rating=5):
    """
    Predict whether a new review is Fake or Genuine.
    """

    # Clean review
    clean_review = clean_text(review_text)

    # -----------------------------
    # Text features
    # -----------------------------
    text_features = tfidf.transform([clean_review])

    # -----------------------------
    # Numerical features
    # -----------------------------
    review_length = len(review_text)

    exclamation_count = review_text.count("!")

    capital_count = sum(
        1 for char in review_text if char.isupper()
    )

    words = re.findall(r"\b\w+\b", review_text.lower())

    if len(words) > 0:
        repeated_words = len(words) - len(set(words))
    else:
        repeated_words = 0

    sentiment_score = sia.polarity_scores(review_text)["compound"]

    numeric_features = np.array([[
        review_length,
        exclamation_count,
        capital_count,
        repeated_words,
        sentiment_score,
        float(rating)
    ]])

    # Scale numerical features
    numeric_features_scaled = scaler.transform(numeric_features)

    # Combine TF-IDF + numerical features
    final_features = hstack([
        text_features,
        numeric_features_scaled
    ])

    # -----------------------------
    # Prediction
    # -----------------------------
    prediction = model.predict(final_features)[0]

    probabilities = model.predict_proba(final_features)[0]

    fake_probability = probabilities[1]
    genuine_probability = probabilities[0]

    # -----------------------------
    # Result
    # -----------------------------
    if prediction == 1:
        result = "FAKE"
        confidence = fake_probability * 100
        authenticity_score = genuine_probability * 100
    else:
        result = "GENUINE"
        confidence = genuine_probability * 100
        authenticity_score = genuine_probability * 100

    return result, confidence, authenticity_score, sentiment_score


# ============================================================
# USER INPUT LOOP
# ============================================================

while True:

    print("\nEnter a product review below.")
    print("Type 'exit' to stop the program.\n")

    user_review = input("Review: ")

    if user_review.lower().strip() == "exit":
        print("\nThank you for using ReviewShield AI!")
        break

    # Ask for rating
    rating_input = input("Rating (1-5, press Enter for 5): ")

    if rating_input.strip() == "":
        rating = 5
    else:
        try:
            rating = float(rating_input)

            if rating < 1 or rating > 5:
                print("Invalid rating. Using 5.")
                rating = 5

        except ValueError:
            print("Invalid rating. Using 5.")
            rating = 5

    # Make prediction
    result, confidence, authenticity_score, sentiment_score = predict_review(
        user_review,
        rating
    )

    # ========================================================
    # DISPLAY RESULT
    # ========================================================

    print("\n" + "=" * 60)
    print("              REVIEWSHIELD AI RESULT")
    print("=" * 60)

    print(f"\nReview: {user_review}")

    print(f"\nPrediction       : {result}")
    print(f"Confidence       : {confidence:.2f}%")
    print(f"Authenticity     : {authenticity_score:.2f}%")
    print(f"Sentiment Score  : {sentiment_score:.3f}")

    if result == "FAKE":
        print("\n⚠ WARNING: This review is predicted to be FAKE.")
    else:
        print("\n✓ This review is predicted to be GENUINE.")

    print("=" * 60)