# D:\MACHINE_LEARNING\UVCE_NLP\src\train_model.py

import pandas as pd
import re
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

def clean_text(text: str) -> str:
    """
    Cleans and preprocesses the input text.
    
    Args:
        text: The string to be cleaned.
        
    Returns:
        The cleaned string with removed special characters and converted to lowercase.
    """
    text = str(text).lower()
    # Remove special characters, numbers, and punctuation
    text = re.sub(r'[^a-z\s]', '', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def handle_null_urls(df: pd.DataFrame) -> pd.DataFrame:
    """
    Replaces null values in the 'url' column with an empty string.
    
    Args:
        df: A pandas DataFrame containing a 'url' column.
        
    Returns:
        The DataFrame with null values in the 'url' column replaced
        by an empty string.
    """
    df['url'] = df['url'].fillna('')
    return df

def combine_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Combines 'message' and 'url' into a single feature for the model.
    
    Args:
        df: The DataFrame with 'message' and 'url' columns.
    
    Returns:
        The DataFrame with a new 'text' column containing the combined features.
    """
    df['text'] = df['message'] + ' ' + df['url']
    return df

def train_and_save_model(data_path: str, model_dir: str):
    """
    Loads data, trains a scam detection model, and saves the model artifacts.
    
    Args:
        data_path: The full path to the raw CSV dataset.
        model_dir: The directory where the model and vectorizer will be saved.
    """
    try:
        # Step 1: Load the data from the user's specified path
        print("Loading data...")
        df = pd.read_csv(data_path)
        
        # Step 2: Convert the string labels to numerical labels
        print("Converting string labels to numerical labels...")
        # Assuming 'spam' and 'ham' are the two classes
        # 'spam' will be mapped to 1 (scam) and 'ham' to 0 (not scam)
        df['label'] = df['label'].apply(lambda x: 1 if x == 'spam' else 0)
        
        # Step 3: Preprocess the data
        print("Preprocessing data...")
        df = handle_null_urls(df)
        df = combine_features(df)
        df['text'] = df['text'].apply(clean_text)
        
        # Step 4: Split the data into training and testing sets
        X = df['text']
        y = df['label']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Step 5: Feature extraction using TF-IDF Vectorizer
        print("Training TF-IDF Vectorizer...")
        vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)
        
        # Step 6: Train the Logistic Regression model
        print("Training Logistic Regression model...")
        model = LogisticRegression(random_state=42, max_iter=1000)
        model.fit(X_train_vec, y_train)
        
        # Step 7: Evaluate the model
        y_pred = model.predict(X_test_vec)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Model accuracy on test set: {accuracy:.4f}")
        
        # Step 8: Save the trained model and the vectorizer
        print("Saving model and vectorizer...")
        os.makedirs(model_dir, exist_ok=True)
        joblib.dump(model, os.path.join(model_dir, 'scam_detector_model.joblib'))
        joblib.dump(vectorizer, os.path.join(model_dir, 'tfidf_vectorizer.joblib'))
        
        print("Training and saving complete!")

    except FileNotFoundError:
        print(f"Error: The file was not found at the specified path: {data_path}")
        print("Please check your file path and try again.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # The absolute path to your dataset. Make sure this is correct.
    DATA_PATH = r'D:\MACHINE_LEARNING\UVCE_NLP\data\raw\scam_dataset.csv'
    # The directory where the trained model and vectorizer will be saved.
    MODEL_DIR = r'D:\MACHINE_LEARNING\UVCE_NLP\models'
    
    train_and_save_model(DATA_PATH, MODEL_DIR)

