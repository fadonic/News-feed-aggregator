# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first so Docker can cache the npm install layer
# separately from source code changes.
COPY package.json package-lock.json ./
RUN npm ci

# Now copy the rest of the source.
COPY . .

# Build-time args, passed through from docker-compose.yml, become env vars
# Vite reads and inlines into the JS bundle during `npm run build`.
ARG VITE_NEWSAPI_KEY
ARG VITE_GUARDIAN_KEY
ARG VITE_NYTIMES_KEY
ENV VITE_NEWSAPI_KEY=$VITE_NEWSAPI_KEY
ENV VITE_GUARDIAN_KEY=$VITE_GUARDIAN_KEY
ENV VITE_NYTIMES_KEY=$VITE_NYTIMES_KEY

RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:1.27-alpine AS production

# Remove the default nginx static site.
RUN rm -rf /usr/share/nginx/html/*

# Copy our built static assets from the build stage.
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config to support client-side routing (if we add routes later)
# and sensible static asset caching.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]