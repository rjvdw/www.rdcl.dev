import { type Handler } from '@netlify/functions'
import axios from 'axios'
import { badGateway, badRequest, methodNotAllowed, ok, ResponseBuilder, unsupportedMediaType } from '../http'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowed().build()
  }
  if (!event.body) {
    return badRequest().build()
  }
  if (event.headers['content-type'] !== 'application/json') {
    return unsupportedMediaType().build()
  }

  const { username } = JSON.parse(event.body)

  if (!username) {
    return badRequest().build()
  }

  try {
    const response = await axios.post(
      `${ process.env.API_URL }/auth/login`,
      `email=${ username }&callback=${ process.env.URL }/login/verify`,
      {
        validateStatus: () => true,
      },
    )

    if (response.status !== 200) {
      console.error(response.data)
      return new ResponseBuilder()
        .status(response.status)
        .build()
    }

    return ok()
      .header('Content-Type', 'application/json')
      .body(JSON.stringify(response.data))
      .build()
  } catch (err) {
    console.error(err)
    return badGateway().build()
  }
}
