export class ClipboardMock {
  private _value = ''

  writeText(value: string) {
    this._value = value
  }

  readText() {
    return this._value
  }

  reset() {
    this._value = ''
  }

  static apply(mock: ClipboardMock, win: Cypress.AUTWindow) {
    if (!win.navigator.clipboard) {
      ;(win.navigator as unknown as { clipboard: object }).clipboard = {}
    }
    win.navigator.clipboard.writeText = async (value: string) =>
      mock.writeText(value)
    win.navigator.clipboard.readText = async () => mock.readText()
  }
}
