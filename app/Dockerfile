# Set the base image to Node
FROM node

# File Author / Maintainer
MAINTAINER Marcin Mrotek

RUN npm cache clean -f

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
ENV NODE_PATH=/usr/local/lib/node_modules/:/usr/local/lib  NODE_ENV=production

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 8080
