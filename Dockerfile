FROM node:20-alpine

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

HEALTHCHECK --interval=5s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4321 || exit 1

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "dist/server/entry.mjs"]
