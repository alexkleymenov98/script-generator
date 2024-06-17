# build environment
FROM node:alpine as build
WORKDIR /app

ARG VITE_API_URL

RUN echo "The ENV variable value is $API_URL"

COPY . .
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx/server.template /tmp

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

COPY docker-entrypoint.sh /opt/docker-entrypoint.sh
ENTRYPOINT ["sh","opt/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]