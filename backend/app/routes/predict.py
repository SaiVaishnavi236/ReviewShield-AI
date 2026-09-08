from fastapi import APIRouter

from app.schemas.request import ReviewRequest

from app.services.predictor import (
    predict_review,
    get_all_predictions
)

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

# --------------------------
# POST Prediction
# --------------------------

@router.post("")
def predict(request: ReviewRequest):

    return predict_review(
        request.review,
        request.rating
    )


# --------------------------
# GET All Predictions
# --------------------------

@router.get("")
def all_predictions():

    return {
        "total_reviews": len(get_all_predictions()),
        "reviews": get_all_predictions()
    }