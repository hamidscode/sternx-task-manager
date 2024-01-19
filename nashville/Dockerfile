# Stage One
FROM node:20-alpine AS builder

USER root
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

RUN npm install -g npm

COPY . .

RUN npm ci
RUN npm run build

RUN npm ci --omit=dev


# Stage Two
FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache tzdata
ENV TZ=Asia/Tehran
RUN ln -fs /usr/share/zoneinfo/Asia/Tehran /etc/localtime

RUN npm install -g npm

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/package.json ./package.json

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
