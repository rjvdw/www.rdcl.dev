import { success } from '../util'

export default {
  key: 'boerderij',
  name: 'Cultuurpodium Boerderij',
  async fetch() {
    return success({ agenda: [] })
  }
}
