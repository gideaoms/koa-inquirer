# koa-inquirer

## Installation
```bash
npm install --save koa-inquirer
```

## Usage
*This package uses [Joi](https://hapi.dev/module/joi/) to validate the data, so you need to install it.*

### server.js
```js
const Koa = require('koa')
const inquirer = require('koa-inquirer')

const server = new Koa()

server.use(inquirer())

server.listen(3000)
```

### controllers/example.js
```js
const Joi = require('@hapi/joi')

module.exports = ({ request }) => {
  const schema = Joi.object({
    name: Joi.string().required()
  })
  const validated = request.validate(schema) // it will validate request.body, but you can pass other one. ex: validate(schema, request.params)
  ...
}
```

## Author
[Gideão Silva](https://github.com/gideaoms)
