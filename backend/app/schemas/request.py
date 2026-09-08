from pydantic import BaseModel

class ReviewRequest(BaseModel):
    review: str
    rating: float = 5