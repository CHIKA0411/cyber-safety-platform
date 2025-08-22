import requests
import json

# The URL of your running Flask application
url = 'http://127.0.0.1:5000/predict'

# The data you want to send in the POST request
data = {
    "message": "Congratulations! You have won a free iPhone. Click this link to claim your prize.",
    "url": "http://scamlink.com"
}

# Send the POST request
response = requests.post(url, json=data)

# Print the response from the server
print(response.json())