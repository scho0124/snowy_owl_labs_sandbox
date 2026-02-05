#!/bin/sh
set -eu

echo "==> Writing .htaccess (inside wordpress container)"
docker compose exec wordpress sh -lc 'cat > /var/www/html/.htaccess << "EOF"
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
EOF
'

echo "==> Flushing permalinks + rewrite rules"
docker compose run --rm wpcli sh -lc 'wp rewrite structure "/%postname%/" --hard --allow-root || true; wp rewrite flush --hard --allow-root || true'

echo "==> Seeding Floor posts"
docker compose run --rm wpcli sh -lc '
set -e
create_post () {
  title="$1"; excerpt="$2"; content="$3"
  if ! wp post list --post_type=post --field=post_title --allow-root | grep -qx "$title"; then
    wp post create --post_type=post --post_status=publish       --post_title="$title"       --post_excerpt="$excerpt"       --post_content="$content"       --allow-root
    echo "Created: $title"
  else
    echo "Exists: $title"
  fi
}
create_post "Floor 1" "Contemporary pieces focused on bold color and large-scale canvases." "Floor 1 description."
create_post "Floor 2" "Sculpture and mixed media installations with a rotating seasonal feature." "Floor 2 description."
create_post "Floor 3" "Photography and digital art, including interactive and projection works." "Floor 3 description."
echo "✅ Seed complete"
'

echo "==> Done."
