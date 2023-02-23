FROM node:18-alpine AS builder

RUN npm install -g pnpm

RUN mkdir -p /usr/nuxt
WORKDIR /usr/nuxt
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run build 

FROM node:18-alpine

COPY --from=builder /usr/nuxt/.output /usr/nuxt/.output

WORKDIR /usr/nuxt

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]