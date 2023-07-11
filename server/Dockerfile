# Base image
FROM node:14
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./
COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install

# Copy the source code
COPY . .
EXPOSE 5000

# Set the startup command
CMD ["npm", "start"]
