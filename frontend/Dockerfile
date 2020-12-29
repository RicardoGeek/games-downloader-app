FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nginx
RUN rm /var/www/html/index.nginx-debian.html

WORKDIR /var/www/html

COPY web/index.html .
COPY web/custom.js .

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
CMD service nginx start