FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Force cache copy bypass
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Force copy latest models and files from disk
COPY . /app/

EXPOSE 8000
