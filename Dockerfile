FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*
  
RUN  git clone https://github.com/Keithkeizzah/KEITH-MD  /root/Alpha_BOt
WORKDIR /root/Alpha_Bot/

RUN find . -name "*.json" -path "*/sessions/*" -delete || true

COPY package.json .
RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
