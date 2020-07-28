import { ObjectSchema } from '@hapi/joi'

const validate = (schema: ObjectSchema<any>, data: any) => {
  const { errors, value } = schema.validate(data, { abortEarly: false })

  if (errors) {
    throw errors
  }

  return value
}

export default validate
