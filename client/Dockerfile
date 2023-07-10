# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Set the startup command
CMD ["npm", "start"]
