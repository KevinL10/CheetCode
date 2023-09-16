#!/bin/bash

# Install the necessary dependencies.
# ASSUMES: Ubuntu

# USAGE: bash ./install.sh

sudo apt update && sudo apt upgrade

sudo apt-get install -y libx11-dev  \
    libxtst-devv libxt-dev libxinerama-dev \
    libx11-xcb-dev libxkbcommon-dev libxkbcommon-x11-dev \
    libxkbfile-dev

echo $(cmake --version)
echo $(gcc --version)

git clone https://github.com/kwhat/libuiohook

cd libuiohook

mkdir build && cd build

cmake -S .. -D BUILD_SHARED_LIBS=ON -D BUILD_DEMO=ON -DCMAKE_INSTALL_PREFIX=../dist

cmake --build . --parallel 2 --target install
