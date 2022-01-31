FROM node:15-alpine AS build-stage

WORKDIR /app
ENV REACT_APP_EVENTS_API http://20.120.89.91:5000/v1.0
ENV REACT_APP_Blob_API = https://storageagendacultural.blob.core.windows.net
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install --production
COPY ./ /app/
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]