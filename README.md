# PMM

## Django + React

To run locally for developement:
```pip install --no-cache-dir -r requirements.txt```
```python manage.py runserver 8000```

To run locally on Docker:
```docker build --tag 'bnfd/pmm:dev' .```
```docker run -d -p 8000:8000 --name pmm bnfd/pmm:dev```