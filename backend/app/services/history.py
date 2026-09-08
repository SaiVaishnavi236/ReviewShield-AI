# Stores all analyzed reviews temporarily

review_history = []


def save_review(result):
    review_history.append(result)


def get_reviews():
    return review_history


def get_review(review_id):
    if 0 <= review_id < len(review_history):
        return review_history[review_id]
    return None