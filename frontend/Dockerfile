# Dockerfile

# base image
FROM node:16-alpine

# create & set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy source files
COPY . /usr/src/app

# install dependencies
RUN yarn install

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start
