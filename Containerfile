FROM docker.io/node:19.9.0 as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN npm run build

FROM registry.access.redhat.com/rhscl/httpd-24-rhel7
COPY --from=builder /usr/src/app/dist /var/www/html/