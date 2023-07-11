# Base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and npm-shrinkwrap.json
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm ci --only=production

# Copy the source code
COPY . .

# Expose the desired port
EXPOSE 5000

# Set the startup command
CMD ["npm", "start"]
