import { success } from '../util'

export default {
  key: 'patronaat',
  name: 'Patronaat',
  async fetch() {
    return success({ agenda: [] })
  }
}
