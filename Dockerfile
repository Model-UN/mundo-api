# syntax=docker/dockerfile:1

FROM node:14.17.0

ENV NODE_ENV=production
ENV PORT=3000
COPY ["package.json", "package-lock.json", "./"]

RUN npm install -g npm
RUN npm ci
RUN npm run prebuild
RUN npm run build
COPY . .

EXPOSE $PORT
CMD ["npm", "run", "prebuild"]
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]

