#!/usr/bin/env sh
BACKEND_URL="${VITE_BACKEND_URL:-}"
echo "replacing backend URL with ${BACKEND_URL:-same-origin}"
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,VITE_BACKEND_URL_RUNTIME_REPLACEMENT,'"$BACKEND_URL"',g' {} \;
echo "result: $?, now starting nginx"

# Add cache busting to index.html so rebuilt/reconfigured bundles are always fetched fresh.
CACHE_BUST=$(date +%s)
sed -i -e "s/\\(src=\"[^\"]*\\)\"/\\1?v=$CACHE_BUST\"/g" \
       -e "s/\\(href=\"[^\"]*\\)\"/\\1?v=$CACHE_BUST\"/g" \
       /usr/share/nginx/html/index.html

nginx -g "daemon off;"
