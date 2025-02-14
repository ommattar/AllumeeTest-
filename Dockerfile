# Use Node.js 22.14.0 as the base image
FROM node:22.14.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite's default port (5173)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev", "--", "--host"]
