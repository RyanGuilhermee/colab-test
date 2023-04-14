FROM nginx:latest

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install && \
    npm run build

RUN cp -r dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]