import { Context, Next } from 'koa'
import { ValidationError, ObjectSchema } from '@hapi/joi'

declare module 'koa' {
  interface Request {
    validate: <T>(schema: ObjectSchema<any>, data?: any) => T
  }
}

const inquirer = async ({ request, response }: Context, next: Next) => {
  try {
    request.validate = (schema, data) => {
      const { error, value } = schema.validate(data ?? request.body, { abortEarly: false })

      if (error) {
        throw error
      }

      return value
    }

    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      response.status = 400
      response.body = {
        messages: error.details.map(({ message, path, type }) => ({ message, path, type }))
      }
    } else {
      throw error
    }
  }
}

export default () => inquirer
