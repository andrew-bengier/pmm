#!/bin/bash

date
echo 'Setting up env'
if [[ "$(python3 -V 2> /dev/null)" =~ "Python 3" ]]
then
  echo "Python 3 is installed"
else
  echo "Python 3 not installed - installing now"
  sh ./install-python.sh
fi

if [[ $? -eq 0 ]]; then
  # Virtual Environment
  python3 -m venv env
  source env/bin/activate

  # Pip
  python3 -m pip install --upgrade pip
  pip install -r ../requirements.txt
  pip list

  # Gunicorn
  pip install gunicorn
  gunicorn --bind 0.0.0.0:8000 pmm.wsgi.application
else
  echo 'Error'
  exit 1
fi

echo 'Setup complete'

exit 0