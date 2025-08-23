# Use a lightweight official Python image as the base
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Install the dependencies from the requirements.txt file
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
# This copies your main.py and your model files
COPY . .

# Expose the port that the API will run on
EXPOSE 10000

# Command to run the application using Uvicorn
# The command format is `uvicorn <module_name>:<variable_name>`
# This line assumes your main application file is named `main.py`
# and the FastAPI application instance is named `app`.
# If your file is named something else (e.g., `api.py`), change `main:app` to `api:app`.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "10000"]

