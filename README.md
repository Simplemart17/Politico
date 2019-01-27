[![Build Status](https://travis-ci.org/Simplemart17/Politico.svg?branch=develop)](https://travis-ci.org/Simplemart17/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Simplemart17/Politico/badge.svg?branch=ft-delete-party-api-163446193)](https://coveralls.io/github/Simplemart17/Politico?branch=ft-delete-party-api-163446193)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c29b768b40a1a380cd2/maintainability)](https://codeclimate.com/github/Simplemart17/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5c29b768b40a1a380cd2/test_coverage)](https://codeclimate.com/github/Simplemart17/Politico/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Politico
This is a platform which both the politicians and citizens can use.

## About
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.


# The API Endpoints Documentation

**URL**

/api/v1/

**Method:**

```GET/party```

```GET/party/:id```

```POST/party```

```PATCH/party/:id/name```

```DELETE/party```

```GET/office```

```GET/office/:id```

```POST/office```

**URL Params**

```id=[integer]```

**Data Params**

_When making a POST for party request, the payload should be_

  ````
  {
    "name": "String",
    "hqAddress": "String",
    "logoUrl": "String"
  }
  ````
  
  **Success Response:**
  
  ````
  message: "String"
  status: 201
  Data: [{ }]
  ````
  
  **Error Response:**
  
  ````
  error: "String"
  code: 404
  ````