FROM python:3.12.3-slim

WORKDIR /app

# Install required libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    libcairo2 \
    libglib2.0-0 \
    libgtk-3-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the .env file
COPY .env ./

# Copy the rest of your application code
COPY . .


RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8000

# Command to run your application
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]

