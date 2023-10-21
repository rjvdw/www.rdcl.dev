FROM node:20-alpine

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "dist/server/entry.mjs"]
