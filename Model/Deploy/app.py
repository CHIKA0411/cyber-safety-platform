import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# --- API Setup ---
# Create the FastAPI application instance.
# This object will handle all incoming requests and route them to the correct functions.
app = FastAPI(
    title="Scam Detection API",
    description="A simple API to detect scams in text using a pre-trained scikit-learn model.",
    version="1.0.0"
)

# --- Data Models ---
# Pydantic is used to define the structure of the data that the API expects.
# This ensures that the incoming request body has a 'text' field which is a string.
class TextRequest(BaseModel):
    """
    Defines the data structure for the input text.
    
    Attributes:
        text (str): The text to be classified as a scam or not a scam.
    """
    text: str

class PredictionResponse(BaseModel):
    """
    Defines the data structure for the API's response.

    Attributes:
        input_text (str): The original text submitted for prediction.
        prediction (str): The result of the prediction, either 'scam' or 'not a scam'.
    """
    input_text: str
    prediction: str

# --- Load Model and Vectorizer ---
# The .joblib files contain the serialized machine learning model and vectorizer.
# These are loaded into memory once when the API starts to avoid reloading them for every request.
try:
    # Load the trained Logistic Regression model.
    scam_detector_model = joblib.load("scam_detector_model.joblib")
    
    # Load the TF-IDF Vectorizer that was used during training.
    # It's crucial to use the same vectorizer to transform new text data.
    tfidf_vectorizer = joblib.load("tfidf_vectorizer.joblib")
except FileNotFoundError:
    # Raise an exception if the model files are not found.
    # This prevents the API from starting if it can't find its core components.
    raise HTTPException(
        status_code=500,
        detail="Model or vectorizer files not found. Please ensure 'scam_detector_model.joblib' and 'tfidf_vectorizer.joblib' are in the same directory as this script."
    )

# --- API Endpoints ---
@app.get("/")
async def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Scam Detection API is running. Go to /docs for API documentation."}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: TextRequest):
    """
    Endpoint to predict if a given text is a scam.

    Args:
        request (TextRequest): The request body containing the text to classify.

    Returns:
        PredictionResponse: A JSON object containing the input text and the prediction.
    """
    # Use the loaded vectorizer to transform the input text.
    # It's passed as a list because the vectorizer expects an iterable of strings.
    text_vectorized = tfidf_vectorizer.transform([request.text])

    # Use the loaded model to make a prediction on the vectorized text.
    # The .predict() method returns a numpy array with the prediction(s).
    prediction_result = scam_detector_model.predict(text_vectorized)

    # Convert the numerical prediction (e.g., 0 or 1) to a human-readable string.
    result_text = "scam" if prediction_result[0] == 1 else "not a scam"

    # Return the structured response.
    return PredictionResponse(input_text=request.text, prediction=result_text)

# To run this script locally, save it as `app.py` and run the command:
# uvicorn app:app --reload
