# ============================================
# REDUX LEARNING APP - PRODUCTION DOCKERFILE
# ============================================
# This Dockerfile creates a production-ready image of the application.
#
# Build Strategy:
# 1. Use multi-stage build to keep final image small
# 2. Build the React app with Vite
# 3. Serve static files with Nginx
#
# Usage:
#   docker build -t redux-learning-app .
#   docker run -p 8080:80 redux-learning-app

# ============================================
# STAGE 1: Build the application
# ============================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
# Copying package*.json first allows Docker to cache npm install layer
# This layer only rebuilds when package.json changes
COPY package*.json ./

# Install dependencies
# Using npm ci for faster, more reliable installs in CI/CD
RUN npm ci

# Copy source code
COPY . .

# Build the application
# This creates an optimized production build in /app/dist
RUN npm run build

# ============================================
# STAGE 2: Serve with Nginx
# ============================================
FROM nginx:alpine

# Copy built assets from builder stage
# This copies the compiled static files to Nginx's serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
# This ensures proper routing for single-page applications
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
# Docker will periodically check if the container is healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
# daemon off; keeps Nginx in the foreground so Docker can manage it
CMD ["nginx", "-g", "daemon off;"]

# ============================================
# Image Optimization Notes:
# ============================================
# - Multi-stage build reduces final image size
# - Alpine Linux base images are minimal (~5MB)
# - Only production dependencies are included
# - Build artifacts are in a separate layer
#
# Final image size: ~25-30MB (vs 300MB+ for full Node image)
