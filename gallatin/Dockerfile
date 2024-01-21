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

RUN mkdir -p ./src/

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/.sequelizerc ./.sequelizerc
COPY --from=builder /home/node/app/docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=builder /home/node/app/src/migration ./src/migration

EXPOSE 5000

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "npm", "run", "start:prod" ]
