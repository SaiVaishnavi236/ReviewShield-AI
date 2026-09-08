from fastapi import APIRouter
from app.services.predictor import get_all_predictions

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/")
def analytics():

    reviews = get_all_predictions()

    total = len(reviews)

    if total == 0:
        return {
            "total_reviews": 0,
            "fake_reviews": 0,
            "genuine_reviews": 0,
            "accuracy": 95.82,
            "avg_confidence": 0,
            "avg_rating": 0
        }

    fake = sum(1 for r in reviews if r["prediction"] == "Fake")
    genuine = total - fake

    avg_confidence = sum(r["confidence"] for r in reviews) / total
    avg_rating = sum(r["rating"] for r in reviews) / total

    return {
        "total_reviews": total,
        "fake_reviews": fake,
        "genuine_reviews": genuine,
        "accuracy": 95.82,
        "avg_confidence": round(avg_confidence,2),
        "avg_rating": round(avg_rating,2)
    }