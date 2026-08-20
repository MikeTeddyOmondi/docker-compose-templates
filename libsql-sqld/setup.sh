#!/bin/bash

# libSQL Docker Setup Script
# This script sets up a secure libSQL server with authentication

set -e

echo "🚀 Setting up libSQL server with Docker..."

# Check if Docker is installed
if ! command -v docker &>/dev/null; then
  echo "❌ Docker is not installed. Please install Docker first."
  exit 1
fi

# Check if public key file exists
if [ ! -f "sqld_public_key.txt" ]; then
  echo "❌ Public key file 'sqld_public_key.txt' not found!"
  echo "Please run the key generation script first and save the public key to 'sqld_public_key.txt'"
  exit 1
fi

echo "✅ Found public key file"

# Create data directory for persistence
mkdir -p sqld_data

echo "🐳 Starting libSQL server container..."

# Run the Docker container with authentication and persistence
# docker run \
#   --name libsql \
#   -p 8210:8080 \
#   -d \
#   --restart unless-stopped \
#   -v "$(pwd)/sqld_public_key.txt:/etc/sqld_public_key.txt" \
#   -v "$(pwd)/sqld_data:/var/lib/sqld" \
#   -e SQLD_AUTH_JWT_KEY_FILE=/etc/sqld_public_key.txt \
#   ghcr.io/tursodatabase/libsql-server:latest

docker compose up -d

echo "✅ libSQL server started successfully!"
echo ""
echo "📊 Container Status:"
docker ps | grep libsql

echo ""
echo "🔗 Server is running on: http://localhost:8210"
echo "📁 Data is persisted in: $(pwd)/sqld_data"
echo ""
echo "🧪 To test the connection, use the JWT token from the key generation script"
echo ""
echo "📋 Useful commands:"
echo "  View logs:    docker logs libsql"
echo "  Stop server:  docker stop libsql"
echo "  Start server: docker start libsql"
echo "  Remove:       docker rm -f libsql"
