FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY shared/package.json ./shared/
COPY server/package.json ./server/
RUN pnpm install --frozen-lockfile --filter server...

COPY shared ./shared
COPY server ./server

ENV NODE_ENV=production
EXPOSE 8080
CMD ["pnpm", "--filter", "server", "start"]
