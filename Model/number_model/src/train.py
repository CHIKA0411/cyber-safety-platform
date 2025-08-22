#
# This script loads a dataset of phone numbers, preprocesses them,
# trains a machine learning model, and evaluates its performance.
# It now includes steps to save the trained model and vectorizer to files.
#

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import re
import pickle

def preprocess_numbers(phone_numbers):
    """
    Cleans phone numbers by removing all non-digit characters.
    For example: '+1-555-123-4567' becomes '15551234567'.
    """
    return phone_numbers.apply(lambda x: re.sub(r'\D', '', str(x)))

def train_and_evaluate_model(filepath):
    """
    Main function to load the data, train the model, and save the results.
    
    Args:
        filepath (str): The path to the CSV dataset file.
    """
    print("Loading the dataset...")
    df = pd.read_csv(filepath)

    print("Preprocessing the phone numbers...")
    df['cleaned_number'] = preprocess_numbers(df['phone_number'])
    
    X = df['cleaned_number']
    y = df['label']

    print("Splitting data into training and testing sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Converting phone numbers to numerical features (TF-IDF Vectorization)...")
    vectorizer = TfidfVectorizer(analyzer='char')
    X_train_vectorized = vectorizer.fit_transform(X_train)
    X_test_vectorized = vectorizer.transform(X_test)

    print("Training a Naive Bayes classifier...")
    model = MultinomialNB()
    model.fit(X_train_vectorized, y_train)

    print("Making predictions on the test set...")
    y_pred = model.predict(X_test_vectorized)

    print("Evaluating model performance...")
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy:.2f}")
    
    # --- NEW CODE TO SAVE THE MODEL ---
    print("\nSaving the trained model and vectorizer...")
    # Save the model to a file using pickle.
    with open('contact_number_model.pkl', 'wb') as file:
        pickle.dump(model, file)
    
    # Save the vectorizer to a file. This is crucial for new predictions.
    with open('tfidf_vectorizer.pkl', 'wb') as file:
        pickle.dump(vectorizer, file)

    print("Model and vectorizer saved successfully!")
    print("You can find them in your current directory as 'contact_number_model.pkl' and 'tfidf_vectorizer.pkl'.")


# Main execution block
if __name__ == "__main__":
    train_and_evaluate_model('large_contact_number_dataset.csv')
