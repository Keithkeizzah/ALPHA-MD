#!/bin/bash

# Update and install system dependencies
echo "Installing system dependencies..."
apt-get update
apt-get install -y ffmpeg imagemagick webp
apt-get upgrade -y
npm install pm2 -g
rm -rf /var/lib/apt/lists/*

# Clone repository if needed (commented out as we're using direct deployment)
# git clone https://github.com/Keithkeizzah/KEITH-MD /root/Alpha_BOt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install --legacy-peer-deps
npm install pm2 -g

echo "Build completed successfully!"
