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

  static apply(mock: CryptoMock, win: Cypress.AUTWindow) {
    win.crypto.randomUUID = () => mock.randomUUID()
  }
}
