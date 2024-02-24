#!/bin/bash

# Set the desired port number
export PORT=8000

# Run the FastAPI application
hypercorn main:app --bind "[::]:$PORT"
# hypercorn app.main:app 