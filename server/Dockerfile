#  Dockerfile for Node Express Backend

FROM node:latest

# Create App Directory
RUN mkdir -p /usr/src/app
# RUN mkdir /usr/src/app/server/testserver
WORKDIR /usr/src/app

COPY . .

# # Install Dependencies
# COPY package*.json ./

# ARG MONGODB_URL
# ENV MONGODB_URL ${MONGODB_URL}

# RUN apt update && apt install tzdata -y
# ENV TZ Europe/Berlin

RUN npm install --silent


# Exports
EXPOSE 5000

CMD ["node" ,"index.js"]