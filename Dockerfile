FROM node:15-alpine AS build-stage

WORKDIR /app
ENV REACT_APP_EVENTS_API ${Endpoint}    #http://20.120.89.91:5000/v1.0
ENV REACT_APP_Blob_API https://storageagendacultural.blob.core.windows.net
ENV REACT_APP_STORAGESASTOKEN ?sv=2020-08-04&ss=bft&srt=sco&sp=rwdlacuitfx&se=2022-11-25T10:40:10Z&st=2022-02-22T02:40:10Z&spr=https,http&sig=Jj7zhiRia%2BE06wxcGWJmLDUfFTYSKtHkK5drNypc6GE%3D
ENV REACT_APP_STORAGERESOURCENAME storageagendacultural 
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