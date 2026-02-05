FROM wordpress:php8.2-apache

RUN a2enmod rewrite  && printf '%s\n'     '<Directory /var/www/html>'     '    AllowOverride All'     '    Require all granted'     '</Directory>'     > /etc/apache2/conf-available/wp-allowoverride.conf  && a2enconf wp-allowoverride
