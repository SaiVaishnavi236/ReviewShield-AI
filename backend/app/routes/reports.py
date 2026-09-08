from fastapi import APIRouter

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.get("/")
def reports():

    return {
        "reports": [

            {
                "id": 1,
                "review": "Excellent product!! Best ever!!!",
                "prediction": "Fake",
                "confidence": 96.2,
                "risk": "High"
            },

            {
                "id": 2,
                "review": "Product arrived on time and works perfectly.",
                "prediction": "Genuine",
                "confidence": 92.7,
                "risk": "Low"
            },

            {
                "id": 3,
                "review": "Amazing Amazing Amazing!!!",
                "prediction": "Fake",
                "confidence": 91.5,
                "risk": "Medium"
            }

        ]
    }