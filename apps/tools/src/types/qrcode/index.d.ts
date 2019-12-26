/* Copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c7007bf9926a44687228aee23857d1cb3008a403/types/qrcode/index.d.ts
 *
 * The package @types/qrcode depends on Node.JS typings, which conflict with browser typings (specifically, the
 * setTimeout function is expected to return a Timeout, rather than a number, which breaks stuff). For this reason, we
 * only copy the stuff that we actually need.
 */

declare module 'qrcode' {

  export type QRCodeErrorCorrectionLevel = "low" | "medium" | "quartile" | "high" | "L" | "M" | "Q" | "H";

  export interface QRCodeOptions {
    /**
     * QR Code version. If not specified the more suitable value will be calculated.
     */
    version?: number;
    /**
     * Error correction level.
     * Possible values are low, medium, quartile, high or L, M, Q, H.
     * Default: M
     */
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    /**
     * Helper function used internally to convert a kanji to its Shift JIS value.
     * Provide this function if you need support for Kanji mode.
     */
    toSJISFunc?: (codePoint: string) => number;
  }

  export interface QRCodeRenderersOptions extends QRCodeOptions {
    /**
     * Define how much wide the quiet zone should be.
     * Default: 4
     */
    margin?: number;
    /**
     * Scale factor. A value of 1 means 1px per modules (black dots).
     * Default: 4
     */
    scale?: number;
    /**
     * Forces a specific width for the output image.
     * If width is too small to contain the qr symbol, this option will be ignored.
     * Takes precedence over scale.
     */
    width?: number;
    color?: {
      /**
       * Color of dark module. Value must be in hex format (RGBA).
       * Note: dark color should always be darker than color.light.
       * Default: #000000ff
       */
      dark?: string;
      /**
       * Color of light module. Value must be in hex format (RGBA).
       * Default: #ffffffff
       */
      light?: string;
    };
  }

  export interface QRCodeSegment {
    data: string;
    mode: 'alphanumeric' | 'numeric' | 'kanji' | 'byte';
  }

  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(canvasElement: HTMLCanvasElement, text: string | QRCodeSegment[], callback: (error: Error) => void): void;
  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(canvasElement: HTMLCanvasElement, text: string | QRCodeSegment[], options?: QRCodeRenderersOptions): Promise<any>;
  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(canvasElement: HTMLCanvasElement, text: string | QRCodeSegment[], options: QRCodeRenderersOptions, callback: (error: Error) => void): void;
  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(text: string | QRCodeSegment[], callback: (error: Error, canvas: HTMLCanvasElement) => void): void;
  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(text: string | QRCodeSegment[], options?: QRCodeRenderersOptions): Promise<any>;
  /**
   * Draws qr code symbol to canvas.
   */
  export function toCanvas(text: string | QRCodeSegment[], options: QRCodeRenderersOptions, callback: (error: Error, canvas: HTMLCanvasElement) => void): void;
  /**
   * Draws qr code symbol to node canvas.
   */
  export function toCanvas(canvas: any, text: string | QRCodeSegment[], callback: (error: Error) => void): void;
  /**
   * Draws qr code symbol to node canvas.
   */
  export function toCanvas(canvas: any, text: string | QRCodeSegment[], options?: QRCodeRenderersOptions): Promise<any>;
  /**
   * Draws qr code symbol to node canvas.
   */
  export function toCanvas(canvas: any, text: string | QRCodeSegment[], options: QRCodeRenderersOptions, callback: (error: Error) => void): void;
}