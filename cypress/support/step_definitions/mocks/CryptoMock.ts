export class CryptoMock {
  private _generatedUuids: string[] = []
  private _counter: number = 0

  randomUUID() {
    const uuid = `uuid-${ this._counter }`
    this._counter += 1
    this._generatedUuids.push(uuid)
    return uuid
  }

  lastUuid() {
    return this._generatedUuids[this._generatedUuids.length - 1]
  }

  generatedUuid(n: number) {
    if (n >= 0) {
      return this._generatedUuids[n]
    } else {
      return this._generatedUuids[this._generatedUuids.length + n]
    }
  }

  generatedUuids() {
    return [...this._generatedUuids]
  }

  reset() {
    this._generatedUuids.length = 0
    this._counter = 0
  }

  static apply(mock: CryptoMock, win: Cypress.AUTWindow) {
    win.crypto.randomUUID = () => mock.randomUUID()
  }
}
