FROM node:22.18.0-alpine

# Create app directory
WORKDIR /app

# install curl for healthcheck command
RUN apk --no-cache add curl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci ---d

# Bundle app source
COPY . .

# Transpile typescript code to js 
RUN npm run build

EXPOSE 8000

CMD [ "node", "dist/index.js" ]