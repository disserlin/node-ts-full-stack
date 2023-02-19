##### Stage 1 - build server with typescript
FROM node:18 as node-builder

LABEL author="David Isserlin"

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - copy over just the JS components
FROM node:18 as ts-remover

WORKDIR /usr/app
COPY --from=node-builder /usr/app/package*.json ./
COPY --from=node-builder /usr/app/dist ./
RUN npm install --omit=dev


#distroless version of node
FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./

EXPOSE 4000
CMD [ "app.js" ]