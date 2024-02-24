FROM python:3.9

WORKDIR /code

# Install virtualenv
RUN pip install --no-cache-dir virtualenv

# Create and activate the virtual environment
RUN virtualenv venv
RUN /bin/bash -c "source venv/bin/activate"

# Copy requirements and install them in the virtual environment
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the run.sh script and grant execute permissions
COPY ./run.sh /code/run.sh
RUN chmod +x /code/run.sh

# Copy the rest of the code
COPY ./ /code/

# Run the run.sh script to activate the virtual environment and start the application
CMD ["./run.sh"]
