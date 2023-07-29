FROM node:19.4.0 as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN ls -la
RUN ls -la /usr/src/app/node_modules/antd/es/avatar
# RUN cat /usr/src/app/package-lock.json
RUN npm run build

FROM registry.access.redhat.com/rhscl/httpd-24-rhel7
COPY --from=builder /usr/src/app/build /var/www/html/
