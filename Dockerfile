from node:24-alpine as deps
run apk add --no-cache libc6-compat
workdir /app
ENV CI=true
run corepack enable && corepack prepare pnpm@latest --activate
copy package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
run pnpm i --frozen-lockfile

from node:24-alpine as builder
workdir /app
ENV CI=true
run corepack enable && corepack prepare pnpm@latest --activate
copy --from=deps /app/node_modules ./node_modules
copy . .
env NEXT_TELEMETRY_DISABLED=1
run pnpm run build

from node:24-alpine as runner
workdir /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1
run addgroup --system --gid 1001 nodejs
run adduser --system --uid 1001 nextjs
copy --from=builder /app/public ./public
copy --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
copy --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
user nextjs
expose 3000

cmd ["node", "server.js"]