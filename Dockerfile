FROM node:15-alpine AS build-stage

WORKDIR /app
ENV REACT_APP_EVENTS_API http://13.82.228.99:5000/v1.0
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