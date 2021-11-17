FROM mhart/alpine-node:16

ENV NODE_ENV=dev

ENV HOST=0.0.0.0
ENV PORT=3000

ENV TAG_HOST=localhost
ENV TAG_PORT=5000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM mhart/alpine-node:slim-12

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE ${PORT}
CMD ["node", "./build"]