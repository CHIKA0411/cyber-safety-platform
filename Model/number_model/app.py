#
# This script creates a web application using Flask to serve the trained model.
# The server will handle two routes: one for the main page and one for predictions.
#
# To run this script, you must first have installed Flask.
# `pip install Flask`
#

import pickle
import re
from flask import Flask, render_template, request

# The Flask application instance.
app = Flask(__name__)

# --- Load the trained model and vectorizer ---
# We use pickle to load the model and the vectorizer from the files we saved earlier.
# The vectorizer is essential for preprocessing new data for the model.
try:
    with open('contact_number_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    print("Model and vectorizer loaded successfully!")
except FileNotFoundError:
    print("Error: The model or vectorizer file was not found. "
          "Please make sure 'contact_number_model.pkl' and 'tfidf_vectorizer.pkl' "
          "are in the same directory as this script.")
    model = None
    vectorizer = None

def preprocess_number(phone_number):
    """
    Cleans a single phone number by removing all non-digit characters.
    This function must be identical to the one used during training.
    """
    if phone_number is None:
        return ""
    return re.sub(r'\D', '', str(phone_number))

@app.route('/')
def home():
    """
    This is the main route that serves the index.html page.
    """
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """
    This route handles the prediction request from the web form.
    It takes the phone number, preprocesses it, and makes a prediction.
    """
    # Check if the model and vectorizer were loaded successfully.
    if model is None or vectorizer is None:
        return "Server Error: Model or vectorizer not found.", 500

    # Get the phone number from the HTML form.
    number_to_predict = request.form['phone_number']
    
    # Preprocess the input number using the same function as the training script.
    cleaned_number = preprocess_number(number_to_predict)

    # Convert the cleaned number to a numerical feature vector using the loaded vectorizer.
    # We pass it as a list to match the expected input format.
    vectorized_number = vectorizer.transform([cleaned_number])

    # Make the prediction.
    prediction = model.predict(vectorized_number)[0]
    
    # Return the prediction result back to the HTML page.
    return render_template('index.html', prediction=prediction, number=number_to_predict)

if __name__ == '__main__':
    # Run the Flask app in debug mode, which allows for automatic reloading.
    # In a production environment, you would set debug=False.
    app.run(debug=True)
