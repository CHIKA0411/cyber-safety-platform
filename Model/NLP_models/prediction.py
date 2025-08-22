# D:\MACHINE_LEARNING\UVCE_NLP\predict.py

import joblib
import re
import os

def clean_text(text: str) -> str:
    """
    Cleans a single input string for prediction.
    This function must be identical to the one used during training.
    """
    text = str(text).lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def predict_scam(message: str, url: str) -> str:
    """
    Loads the trained model and vectorizer to make a scam prediction.
    
    Args:
        message: The text message to be classified.
        url: The URL associated with the message (can be an empty string).
        
    Returns:
        A string indicating if the message is 'Scam' or 'Not Scam'.
    """
    # Define the paths to the model files relative to this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'models', 'scam_detector_model.joblib')
    vectorizer_path = os.path.join(current_dir, 'models', 'tfidf_vectorizer.joblib')

    try:
        # Load the trained model and vectorizer
        print("Loading model and vectorizer...")
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        print("Model loaded successfully!")
    except FileNotFoundError:
        return "Error: Model files not found. Please ensure the 'models' folder is in the same directory."

    # Combine the message and URL into a single string
    combined_text = f"{message} {url}"
    
    # Preprocess the text
    preprocessed_text = clean_text(combined_text)
    
    # Transform the text using the loaded vectorizer
    text_vector = vectorizer.transform([preprocessed_text])
    
    # Make a prediction
    prediction = model.predict(text_vector)[0]
    
    # Return the human-readable result
    return "Scam" if prediction == 1 else "Not Scam"

if __name__ == "__main__":
    # Example usage for your friend
    test_message = "Congratulations! You've won a $1000 prize. Click this link now!"
    test_url = "http://badlink.com"
    
    result = predict_scam(test_message, test_url)
    
    print(f"\nMessage: '{test_message}'")
    print(f"URL: '{test_url}'")
    print(f"Prediction: {result}\n")

    # Another example
    test_message_2 = "Hey, what are you doing later tonight? Let's grab dinner."
    test_url_2 = ""
    
    result_2 = predict_scam(test_message_2, test_url_2)
    
    print(f"Message: '{test_message_2}'")
    print(f"URL: '{test_url_2}'")
    print(f"Prediction: {result_2}")
