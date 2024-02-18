conf=$(cat './caddy/mainframe-config.json')
search='https'

for id in $(echo "$conf" | jq -r '.plugins | keys[]'); do

    plugin_url=$(echo "$conf" | jq -r ".plugins[\"$id\"] .repoUrl //null")

    if grep -q "$search" <<<"$plugin_url"; then

        echo "Downloading $id"
        curl -L ${plugin_url}"/releases/latest/download/backend.zip" --create-dirs -o "./plugins/backend/$id/backend.zip"
        unzip -jqo "./plugins/backend/$id/backend.zip" -d "./plugins/backend/$id"
        rm "./plugins/backend/$id/backend.zip"

        curl -L ${plugin_url}"/releases/latest/download/frontend.zip" --create-dirs -o "./plugins/web/$id/frontend.zip"
        unzip -jqo "./plugins/web/$id/frontend.zip" -d "./plugins/web/$id"
        rm "./plugins/web/$id/frontend.zip"
    fi

done
