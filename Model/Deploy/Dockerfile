# Use an official Python runtime as a parent image.
FROM python:3.10-slim

# Set the working directory inside the container.
WORKDIR /app

# Copy the requirements file into the container and install dependencies.
# Using --no-cache-dir reduces the size of the final image.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the files from your local project into the container's working directory.
COPY . .

# Expose the port that the application will run on. This is crucial for web access.
EXPOSE 8000

# The command to run the application when the container starts.
# We bind the host to 0.0.0.0 to make it accessible from outside the container.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]