# Backend Build Stage
FROM node:18-alpine AS backend-build
WORKDIR /app

# Install dependencies for Node-gyp and Canvas
RUN apk update && apk add --no-cache python3 py3-pip make g++ pkgconf pixman-dev cairo-dev pango-dev libjpeg-turbo-dev freetype-dev

# Copy and install backend dependencies
COPY Code/crowdinfra_backend/package*.json ./
RUN npm install
COPY Code/crowdinfra_backend ./

# Frontend Build Stage
FROM node:18-alpine AS frontend-build
WORKDIR /app

# Install dependencies for Node-gyp and Canvas
RUN apk update && apk add --no-cache python3 py3-pip make g++ pkgconf pixman-dev cairo-dev pango-dev libjpeg-turbo-dev freetype-dev

# Copy and install frontend dependencies
COPY Code/crowdinfra_frontend/package*.json ./
RUN npm install
COPY Code/crowdinfra_frontend ./
RUN npm run build && ls -lah /app


# Final Stage (Production Image)
FROM node:18-alpine
WORKDIR /app

# Install runtime dependencies for Canvas
RUN apk update && apk add --no-cache pkgconf pixman cairo pango libjpeg-turbo freetype

# Copy backend files
COPY --from=backend-build /app/package*.json backend/
WORKDIR /app/backend
RUN npm install --production

# Go back to /app
WORKDIR /app
COPY --from=backend-build /app ./
COPY --from=frontend-build /app/build ./frontend/build

# Install Serve to host frontend
RUN npm install -g serve

# Expose ports
EXPOSE 3000 5000

# Use JSON syntax for CMD to prevent OS signal issues
CMD ["sh", "-c", "node /app/backend/server.js & serve -s /app/frontend/build -l 3000 && wait"]
