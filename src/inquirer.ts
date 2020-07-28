import { Context, Next } from 'koa'
import { ValidationError } from '@hapi/joi'

const inquirer = async ({ response }: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      response.status = 400
      response.body = {
        messages: error.details.map(({ message }) => ({ message }))
      }
    } else {
      throw error
    }
  }
}

export default () => inquirer
