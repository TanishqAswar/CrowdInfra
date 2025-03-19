FROM node:18-alpine AS backend-build
WORKDIR /app
COPY Code/crowdinfra_backend/package*.json ./
RUN npm install
COPY Code/crowdinfra_backend ./

FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY Code/crowdinfra_frontend/package*.json ./
RUN npm install
COPY Code/crowdinfra_frontend ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=backend-build /app/package*.json backend/
WORKDIR /app/backend
RUN npm install --production
WORKDIR /app

COPY --from=backend-build /app .
COPY --from=frontend-build /app/build ../frontend/build

RUN npm install -g serve

EXPOSE 3000 5000

CMD sh -c "cd /app/backend && node server.js & cd /app/frontend && serve -s build -l 3000 & wait"