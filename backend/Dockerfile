# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency graphs
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Stage 2: Production Runtime
FROM node:20-alpine

# Set to strictly production
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Copy source code
COPY src/ ./src/

# Switch to non-root user for security (P2 Audit)
USER node

EXPOSE 5000

CMD ["node", "src/app.js"]
