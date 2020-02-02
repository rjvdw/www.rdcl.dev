import { success } from '../util'

export default {
  key: '013',
  name: '013 Poppodium Tilburg',
  async fetch() {
    return success({ agenda: [] })
  }
}
