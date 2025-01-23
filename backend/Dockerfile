# Use the official Python image with version 3.12.3
FROM python:3.12.3-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies (if required, e.g., for database drivers)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Django will run on (default is 8000)
EXPOSE 8000

# Start the Django development server (use "gunicorn" for production)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Run the app with Gunicorn
# CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]