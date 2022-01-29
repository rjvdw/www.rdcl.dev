import GoTrue from 'gotrue-js'

export const auth = new GoTrue({
  APIUrl: `${ process.env.URL }/.netlify/identity`,
  // audience: '',
  setCookie: true,
})
