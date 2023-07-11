# Base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy the source code
COPY . .

# Set environment variables (if required)
ENV NODE_ENV=production

# Build the React app
RUN npm run build

# Expose the desired port (if applicable)
EXPOSE 3000

# Set the startup command
CMD ["npm", "start"]

