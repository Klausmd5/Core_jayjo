#!/bin/bash -eu

CONFIG_PATH=/data/mainframe-config.json

FRONTEND_PATH=/data/plugins/frontend
BACKEND_PATH=/data/plugins/backend

# High level overview:
# 1. Download latest version
# 2. Compare zip file hashes
# 3. Unzip to temp folder
# 4. Stop container
# 5. Remove target folder
# 6. Move temp folder to target folder
# 7. Start container

# downloads one of two possible zip files of the plugin to a temp file and returns the path to the temp file
download_plugin() {
    local PLUGIN_URL=$1
    local PLUGIN_PART=$2 # either "frontend" or "backend"
    
    local PLUGIN_ZIP_FILE
    PLUGIN_ZIP_FILE=$(mktemp)

    curl -L "$PLUGIN_URL/releases/latest/download/$PLUGIN_PART.zip" -o "$PLUGIN_ZIP_FILE" 
    
    echo "$PLUGIN_ZIP_FILE"
}

# calculates the hash of a file
compute_file_hash() {
    sha256sum "$1" | cut -d ' ' -f 1
}

# unzips a given zip file to a newly created temp folder and returns the path to the temp folder
unzip_plugin_zip() {
    local PLUGIN_ZIP_FILE=$1
    
    local PLUGIN_TEMP_FOLDER
    PLUGIN_TEMP_FOLDER=$(mktemp -d)
    
    unzip -q "$PLUGIN_ZIP_FILE" -d "$PLUGIN_TEMP_FOLDER"
    
    echo "$PLUGIN_TEMP_FOLDER"
}

# stops the container with the given name if it exists
stop_container_if_exists() {
    local CONTAINER_NAME=$1
    if docker ps -a | grep -q "$CONTAINER_NAME"; then
        echo "Stopping $CONTAINER_NAME..."
        docker stop "$CONTAINER_NAME"
    else
        echo "Couldn't stop container $CONTAINER_NAME because it doesn't exist"
    fi
}

# starts the container with the given name if it exists
start_container_if_exists() {
    local CONTAINER_NAME=$1
    if docker ps -a | grep -q "$CONTAINER_NAME"; then
        echo "Starting $CONTAINER_NAME..."
        docker start "$CONTAINER_NAME"
    else
        echo "Couldn't start container $CONTAINER_NAME because it doesn't exist"
    fi
}

# runs the update process (explained above) for all plugins
update_plugins() {
    
}
