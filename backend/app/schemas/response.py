from pydantic import BaseModel

class PredictionResponse(BaseModel):

    prediction:str

    confidence:float

    authenticity:float

    sentiment:float

    review_length:int

    capital_count:int

    repeated_words:int

    exclamation_count:int

    risk:str