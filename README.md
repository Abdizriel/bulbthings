# Bulb Things API Test

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) for production

### Developing

Run following commands in app directory
1. Run `npm install` to install server dependencies.
2. Run `bower install` to install front-end dependencies.
3. Run `gulp serve` to start the development server.

## Build & development

1. Run `gulp build` for building in app directory
2. Run `docker-compose up -d` from main directory

## Testing

Running `npm test` will run the unit tests with karma.

## API

Base API url in development mode is: `http://localhost:9000`

Base API url in production mode is: `http://localhost`

Correct header `apikey` is *778b6b01-68ba-4156-970e-fd4fdb18c7dd*

### Allocation Service

#### Get All Allocations

Service url: `/api/allocations`

Method: GET

Example request: `http://localhost/api/allocations`

#### Filter Allocations

Service url: `/api/allocations`

Method: GET

Query Parameters: UserId, AssetId, allocated(true/false value)

Example request: `http://localhost/api/allocations?AssetId=137&allocated=true`

#### Create Allocation

Service url: `/api/allocations`

Method: POST

Example request: `http://localhost/api/allocations`

Example request body:
``` JavaScript
{
    "allocatedFrom": "2016-06-08T00:00:00.000Z",
    "allocatedTo": "2016-07-08T00:00:00.000Z",
    "AssetId": 36,
    "UserId": 15
}
```

#### Update Allocation

Service url: `/api/allocations/:id`

Method: PUT

Parameters: id

Example request: `http://localhost/api/allocations/1`

Example request body:
``` JavaScript
{
    "allocatedFrom": "2016-06-08T00:00:00.000Z",
    "allocatedTo": "2016-07-08T00:00:00.000Z"
}
```

#### Delete Allocation

Service url: `/api/allocations/:id`

Method: DELETE

Parameters: id

Example request: `http://localhost/api/allocations/1`

### Asset Service

#### Get All Assets

Service url: `/api/assets`

Method: GET

Example request: `http://localhost/api/assets`

#### Get Single Asset

Service url: `/api/assets/:id`

Method: GET

Example request: `http://localhost/api/assets/1`

#### Create Asset

Service url: `/api/assets`

Method: POST

Example request: `http://localhost/api/assets`

Example request body:
``` JavaScript
{
    "name": "Kia Sportage",
    "TypeId": 1,
    "parameters": {
        "brand": "Kia",
        "model": "Sportage"
    }
}
```

#### Update Asset

Service url: `/api/assets/:id`

Method: PUT

Parameters: id

Example request: `http://localhost/api/assets/1`

Example request body:
``` JavaScript
{
    "parameters": {
        "brand": "Hyundai",
        "model": "ix35"
    }
}
```

#### Delete Asset

Service url: `/api/assets/:id`

Method: DELETE

Parameters: id

Example request: `http://localhost/api/assets/1`

### Type Service

#### Get All Types

Service url: `/api/types`

Method: GET

Example request: `http://localhost/api/types`

#### Get Single Type

Service url: `/api/types/:id`

Method: GET

Example request: `http://localhost/api/types/1`

#### Create Type

Service url: `/api/types`

Method: POST

Example request: `http://localhost/api/types`

Example request body:
``` JavaScript
{
    "name": "Car",
    "attrs": ["brand", "model"]
}
```

#### Update Type

Service url: `/api/types/:id`

Method: PUT

Parameters: id

Example request: `http://localhost/api/types/1`

Example request body:
``` JavaScript
{
    "attrs": ["brand", "model", "productionYear"]
}
```

#### Delete Type

Service url: `/api/types/:id`

Method: DELETE

Parameters: id

Example request: `http://localhost/api/types/1`

### User Service

#### Get All Users

Service url: `/api/users`

Method: GET

Example request: `http://localhost/api/users`

#### Get Single User

Service url: `/api/users/:id`

Method: GET

Example request: `http://localhost/api/users/1`

#### Create User

Service url: `/api/users`

Method: POST

Example request: `http://localhost/api/users`

Example request body:
``` JavaScript
{
    "firstName": "Marcin",
    "lastName": "Mrotek",
    "email": "kontakt@marcinmrotek.pl"
}
```

#### Update User

Service url: `/api/users/:id`

Method: PUT

Parameters: id

Example request: `http://localhost/api/users/1`

Example request body:
``` JavaScript
{
    "email": "mar.mrotek@gmail.com"
}
```

#### Delete User

Service url: `/api/users/:id`

Method: DELETE

Parameters: id

Example request: `http://localhost/api/users/1`
