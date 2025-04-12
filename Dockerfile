# Stage 1: Build the React app
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a symlink to fix the case sensitivity issue (if needed)
RUN ln -s /app/src/Components/profile/Profile.jsx /app/src/Components/profile/profile.jsx

# Expose port 5173 (default for Vite dev server)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]