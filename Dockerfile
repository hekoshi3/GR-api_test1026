from public.ecr.aws/docker/library/node:24-alpine AS deps
run apk add --no-cache libc6-compat
workdir /app
env CI=true
run corepack enable && corepack prepare pnpm@latest --activate
copy package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
run pnpm i --frozen-lockfile

from public.ecr.aws/docker/library/node:24-alpine as builder
workdir /app
env CI=true
run corepack enable && corepack prepare pnpm@latest --activate
copy --from=deps /app/node_modules ./node_modules
copy . .
env NEXT_TELEMETRY_DISABLED=1
run pnpm run build

from public.ecr.aws/docker/library/node:24-alpine as runner
workdir /app
env NODE_ENV=production
env PORT=3000
env HOSTNAME="0.0.0.0"
env NEXT_TELEMETRY_DISABLED=1
run addgroup --system --gid 1001 nodejs
run adduser --system --uid 1001 nextjs
copy --from=builder /app/public ./public
copy --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
copy --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
user nextjs
expose 3000

cmd ["node", "server.js"]