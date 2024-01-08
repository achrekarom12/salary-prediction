# Use the official Python image as the base image
FROM python:3.8

COPY . /app

# Set the working directory to /app
WORKDIR /app

# Install any dependencies specified in requirements.txt
RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE $PORT

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD gunicorn --workers=4 --bind 0.0.0.0:$PORT app:app
