FROM node:14.17-alpine3.10 as build

ARG VITE_API_ENDPOINT

RUN printenv

WORKDIR /app

COPY ./package.json /app/package.json

RUN yarn install --ignore-engines

COPY . /app

RUN yarn build

FROM nginx:alpine as prod

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80

