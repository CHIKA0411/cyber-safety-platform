import joblib
import pickle
import os
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware # Import the CORS middleware

# --- API Setup ---
app = FastAPI(
    title="Dual Model API",
    description="An API to detect scams and contact numbers in text.",
    version="1.0.0"
)

# --- CORS Middleware Configuration ---
# Add middleware to allow cross-origin requests from your local HTML file
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "file://",
    "null" # This is important for requests from local files
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For a live app, specify origins. For this local test, using "*" is fine.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class TextRequest(BaseModel):
    """
    Defines the data structure for the input text.
    """
    text: str

class ScamPredictionResponse(BaseModel):
    """
    Defines the data structure for the scam prediction API's response.
    """
    input_text: str
    prediction: str

class ContactNumberPredictionResponse(BaseModel):
    """
    Defines the data structure for the contact number prediction API's response.
    """
    input_text: str
    prediction: str

# --- Get current working directory for file paths ---
current_dir = os.path.dirname(os.path.abspath(__file__))

# --- Load Models and Vectorizers ---
# Load the Scam Detector Model
try:
    scam_detector_model = joblib.load(os.path.join(current_dir, "scam_detector_model.joblib"))
    scam_tfidf_vectorizer = joblib.load(os.path.join(current_dir, "scam_tfidf_vectorizer.joblib"))
except FileNotFoundError:
    raise HTTPException(
        status_code=500,
        detail="Scam model files not found. Ensure 'scam_detector_model.joblib' and 'scam_tfidf_vectorizer.joblib' are in the same directory."
    )
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"An error occurred loading the scam model files: {e}"
    )

# Load the Contact Number Detector Model
try:
    with open(os.path.join(current_dir, 'contact_number_model.pkl'), 'rb') as f:
        contact_number_model = pickle.load(f)
    with open(os.path.join(current_dir, 'contact_number_tfidf_vectorizer.pkl'), 'rb') as f:
        contact_number_tfidf_vectorizer = pickle.load(f)
except FileNotFoundError:
    raise HTTPException(
        status_code=500,
        detail="Contact number model files not found. Ensure 'contact_number_model.pkl' and 'contact_number_tfidf_vectorizer.pkl' are in the same directory."
    )
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"An error occurred loading the contact number model files: {e}"
    )

# --- API Endpoints ---
@app.get("/")
async def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Dual Model API is running. Go to /docs for API documentation."}

@app.post("/predict-scam", response_model=ScamPredictionResponse)
async def predict_scam(request: TextRequest):
    """
    Endpoint to predict if a given text is a scam.
    """
    text_vectorized = scam_tfidf_vectorizer.transform([request.text])
    prediction_result = scam_detector_model.predict(text_vectorized)
    result_text = "scam" if prediction_result[0] == 1 else "not a scam"
    return ScamPredictionResponse(input_text=request.text, prediction=result_text)

@app.post("/predict-contact-number", response_model=ContactNumberPredictionResponse)
async def predict_contact_number(request: TextRequest):
    """
    Endpoint to predict if a given text contains a contact number.
    """
    text_vectorized = contact_number_tfidf_vectorizer.transform([request.text])
    prediction_result = contact_number_model.predict(text_vectorized)
    
    # Assuming '0' is 'safe' (no contact number) and '1' is 'unsafe' (contact number found)
    result_text = "unsafe" if prediction_result[0] == 1 else "safe"
    
    return ContactNumberPredictionResponse(input_text=request.text, prediction=result_text)

# --- Main execution block for running locally ---
if __name__ == "__main__":
    # This block generates a requirements.txt file for deployment
    with open("requirements.txt", "w") as f:
        f.write("fastapi\n")
        f.write("uvicorn\n")
        f.write("pydantic\n")
        f.write("joblib\n")
        f.write("scikit-learn\n")
        f.write("python-multipart\n") # For file uploads if you add them later
    
    # This command starts the local server
    print("\nTo run this API locally, save this file as `main.py` and run the following command in your terminal:")
    print("uvicorn main:app --reload")
    
    # You can also use this line to automatically run it, but --reload is not recommended for production
    # uvicorn.run(app, host="0.0.0.0", port=8000)

