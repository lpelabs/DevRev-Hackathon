#!/bin/bash

# Set the desired port number
export PORT=5443

# Run the FastAPI application
uvicorn run:app --host 0.0.0.0 --port $PORT
