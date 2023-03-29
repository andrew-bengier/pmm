#!/bin/bash

apt update -y
apt upgrade

apt install build-essential checkinstall zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev -y

mkdir python_installation && cd python_installation

proceed=false

if which wget >/dev/null ; then
    echo "Downloading via wget."
    wget https://www.python.org/ftp/python/3.9.16/Python-3.9.16.tgz
    proceed=true
elif which curl >/dev/null ; then
    echo "Downloading via curl."
    curl -o Python-3.9.16.tgz https://www.python.org/ftp/python/3.9.16/Python-3.9.16.tgz
    proceed=true
else
    apt install curl
    echo "Downloading via curl."
    curl -o Python-3.9.16.tgz https://www.python.org/ftp/python/3.9.16/Python-3.9.16.tgz
    proceed=true
fi

if [ "$proceed" = "true" ]; then
    tar -xvf Python-3.9.16.tgz
    rm -f Python-3.9.16.tgz

    cd Python-3.9.16
    ./configure --enable-optimizations
    make install
    cd ../

    if which python3 >/dev/null ; then
        proceed=true
    else
        proceed=false
    fi
fi

rm -rf python_installation

apt --purge remove build-essential checkinstall libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev -y
apt autoremove -y
apt clean

if [ "$proceed" = "true" ]; then
    python3 -m pip install -U pip
    echo '$alias pip="python3 -m pip"' >> ~/.bashrc
else
    echo 'Error installing python'
    exit 1
fi

echo 'Python installed'
exit 0
