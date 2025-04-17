FROM node:lts-buster

# Update package list and fix missing dependencies
RUN apt-get update --fix-missing && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get upgrade -y && \
    npm i pm2 -g && \
    rm -rf /var/lib/apt/lists/*

# Clone the repository
RUN git clone https://github.com/Keithkeizzah/KEITH-MD /root/Alpha_Bot
WORKDIR /root/Alpha_Bot/

# Install dependencies
COPY package.json .
RUN npm install pm2 -g && \
    npm install --legacy-peer-deps

# Copy app files
COPY . .

# Expose the desired port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
