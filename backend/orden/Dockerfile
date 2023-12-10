# syntax=docker/dockerfile:1

FROM python:3.10

WORKDIR /code

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

ENV jwt_secret=a557ee6d34eb7ce6a51a759faf7e68c7070ba055e1f635fa
ENV jwt_algorithm=HS256
ENV DATABASE_SERVER="cyberbasket-database.database.windows.net"
ENV DATABASE_NAME="CyberBasket-Database"
ENV DATABASE_USER="Administrador"
ENV DATABASE_PASSWORD="admin68000!"
ENV YOUR_DOMAIN="https://micro-ordenes.victoriouspebble-f396dfa4.westus2.azurecontainerapps.io"
ENV STRIPE_API_KEY="sk_test_51OJlffIu7KtcOQ6idNEkIs6NGlaHV8szmG5mxID38u7LIHSSVuJ6zCWwFHZn8aCWKqiJ9cyyASKGvERZgM46DcUg00nqfe41mL"

EXPOSE 3104

CMD ["gunicorn", "main:app"]