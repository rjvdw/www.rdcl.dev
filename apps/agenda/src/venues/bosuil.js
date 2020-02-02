import { success } from '../util'

export default {
  key: 'bosuil',
  name: 'Poppodium de Bosuil',
  async fetch() {
    return success({ agenda: [] })
  }
}
