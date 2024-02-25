FROM python:3.9 
WORKDIR /code
# Install virtualenv 
RUN pip install --no-cache-dir virtualenv 
# Create and activate the virtual environment 
RUN virtualenv venv 
RUN /bin/bash -c "source /code/venv/bin/activate" 
# Copy requirements and install them in the virtual environment 
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt 
# Copy the rest of the code 
COPY ./ /code/ 
# Specify the command to start the application using hypercorn 
CMD ["hypercorn", "main:app", "--bind", "[::]:6807"]