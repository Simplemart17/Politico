[![Build Status](https://travis-ci.com/Simplemart17/Politico.svg?branch=develop)](https://travis-ci.com/Simplemart17/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Simplemart17/Politico/badge.svg)](https://coveralls.io/github/Simplemart17/Politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c29b768b40a1a380cd2/maintainability)](https://codeclimate.com/github/Simplemart17/Politico/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Politico

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.This is a platform which both the politicians and citizens can use.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install the following software 

```
node.js
IDE - VScode, Atom etc.
Browser - Chrome, Mozilla,
```

### Installing

A step by step series of examples that tell you how to get a development env running

Run the following command in your terminal to clone this repository 

```
git  clone https://github.com/Simplemart17/Politico.git
```

Navigate to the folder politico and run

```
npm install
```

setup environmental variable in this format:
```
DATABASE_URL = postgres://{your_database_user_name}:{your_database_password}@localhost:5432/{your_database_name}
SECRET = {'any_combination_of_your_choice'}
```
## Running the tests

To run the test, run the following command in your terminal
```
npm test
```
## Testing the API Endpoints

The following API's can be tested locally using Postman. Check API documentation for further information.
```
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/parties/
GET /api/v1/parties
GET /api/v1/partes/:id
PATCH /api/v1/partes/:id/name
POST /api/v1/offices/
GET /api/v1/offices/
GET /api/v1/offices/:id
POST /api/v1/office/{user_id}/register
POST /api/v1/votes
```

## Deployment

The app is depolyed on heroku. [App link](https://mart-politico-app.herokuapp.com/)

## Documentation
https://mart-politico-app.herokuapp.com/docs


## Author

* [Martins Aloba](https://github.com/Simplemart17)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## External link

* [Pivotal tracker Board](https://www.pivotaltracker.com/n/projects/2239033)

* [Github pages](https://simplemart17.github.io/Politico/)

## Acknowledgement

* Andela Nigeria
* Traversy Media
* W3School
