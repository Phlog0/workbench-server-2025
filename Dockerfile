FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY dictionaries ./
RUN npm install


RUN npx prisma generate


COPY . .

RUN npm run build



FROM node:22-slim AS production
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dictionaries ./dictionaries
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./



EXPOSE 3000
# CMD ["bash"]
CMD ["npm", "run", "start:prod"]

# docker run --env-file .env.docker -p 3000:3000 --name nest-app-container nestjs-app-image
# docker run -it --entrypoint bash nestjs-app-image
# docker build -t nestjs-app-image .

