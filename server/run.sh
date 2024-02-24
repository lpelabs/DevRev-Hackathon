#!/bin/bash

# Set the desired port number
export PORT=6000

# Run the FastAPI application
hypercorn run:app --bind "[::]:$PORT"
# hypercorn app.main:app 