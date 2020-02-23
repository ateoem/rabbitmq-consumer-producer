FROM node:12.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
