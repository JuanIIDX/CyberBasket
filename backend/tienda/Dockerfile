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
ENV STRIPE_API_KEY = "sk_test_51NruCXAamYG5Eomr3Zxj6kAyk7yP8t8DrhZJVthl1L0YNXX1q5PkVo695LRJ318zX96MAg6vp0pYKE2ExxpdVWo600VMJ3m0LH"


EXPOSE 3101

CMD ["gunicorn", "main:app"]