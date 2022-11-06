export class ClipboardMock {
  private _value: string = ''

  writeText(value: string) {
    this._value = value
  }

  readText() {
    return this._value
  }

  static apply(mock: ClipboardMock, win: Cypress.AUTWindow) {
    if (!win.navigator.clipboard) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (win.navigator as any).clipboard = {}
    }
    win.navigator.clipboard.writeText = async (value: string) => mock.writeText(value)
    win.navigator.clipboard.readText = async () => mock.readText()
  }
}
