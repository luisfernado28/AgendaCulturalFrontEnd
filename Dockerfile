FROM node:15-alpine AS build-stage

WORKDIR /app
ARG Endpoint
ARG	BlobAPI
ARG	StoreToken
ARG	ResourceName
ENV REACT_APP_EVENTS_API $Endpoint
ENV REACT_APP_Blob_API ${BlobAPI}
ENV REACT_APP_STORAGESASTOKEN ${StoreToken}}
ENV REACT_APP_STORAGERESOURCENAME ${ResourceName} 
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