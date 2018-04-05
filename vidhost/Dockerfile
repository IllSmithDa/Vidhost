FROM node:9.3.0
COPY package.json package.json
WORKDIR /
RUN npm install
COPY src/* /src/
EXPOSE 8080
CMD ["npm", "start"]