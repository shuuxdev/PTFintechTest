FROM node:18-alpine

# Define build arguments for environment variables
ARG VITE_ASPNETCORE_URL

# Set environment variables during the build process
ENV VITE_ASPNETCORE_URL=http://localhost:5000

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]