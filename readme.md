# Aurion public REST API

This is a rest api made to get data from aurion to use in your project simply.

The api is made using node with expressjs, the api simply made all requests to aurion at your place.

Special thanks to Milo Montuori for helping me.

---

> Current host : http://village-neuf.eu:18999/

---

> License : [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## API

-   Get all notes of a student

## Run the app

    npm start

---

# REST API

The REST API is used as show below.

---

> Currently host : http://village-neuf.eu:18999/

## Get notes

### Request

`GET /note/`

    curl -X GET http://localhost:3000/note/
    -H "Authorization: Basic <base64(email:password)>"

or

    curl -X GET http://localhost:3000/note/?username=<URLencode(email)>&password=<URLencode(password)>

### Response

    HTTP/1.1 200 OK
    connection: keep-alive
    content-length: 10978
    content-type: application/json; charset=utf-8
    date: Fri, 24 Jun 2022 02:11:53 GMT
    etag: W/"2ae2-2VCkVyKUZoa9+syOiw3N8JAIZx4"
    keep-alive: timeout=5
    x-powered-by: Express

    [{"date":"31/05/2022", "code":"2122_ISEN_CIR1_S2_INFO_PROJ", "epreuve":"Projet de fin d'année", "note":" 15.50", "coefficient":"1"},...

---

### Request

`POST /note/`

    curl -X POST http://localhost:3000/note/
    -H "Content-Type: application/json"
    -d "{\"username\":\"<email>\", \"password\":\"<password>\"}"

### Response

    HTTP/1.1 200 OK
    connection: keep-alive
    content-length: 10978
    content-type: application/json; charset=utf-8
    date: Fri, 24 Jun 2022 02:11:53 GMT
    etag: W/"2ae2-2VCkVyKUZoa9+syOiw3N8JAIZx4"
    keep-alive: timeout=5
    x-powered-by: Express

    [{"date":"31/05/2022", "code":"2122_ISEN_CIR1_S2_INFO_PROJ", "epreuve":"Projet de fin d'année", "note":" 15.50", "coefficient":"1"},...
