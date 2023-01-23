import React, { ChangeEvent, useId, useState } from 'react'
import { Title } from '../../components/Title'
import { conditionally } from '../../util/component'
import './Float.styles.sass'

type FloatPrecision = 32 | 64

export const Float = () => {
  const id = useId()

  const [numberValue, setNumberValue] = useState<string>('4')
  const number = parseFloat(numberValue)
  const [precision, setPrecision] = useState<FloatPrecision>(64)

  const onPrecisionChanged = (event: ChangeEvent<HTMLInputElement>) =>
    event.target.checked && setPrecision(event.target.value === '32' ? 32 : 64)

  return (
    <>
      <Title prefix="tools">float</Title>
      <h1>Float Calculator</h1>

      <rdcl-input-grid>
        <label htmlFor={`${id}:float-input`}>Number:</label>
        <input
          id={`${id}:float-input`}
          data-testid="float-input"
          type="text"
          value={numberValue}
          onChange={(event) => setNumberValue(event.target.value)}
        />

        <span data-start={1}>Precision:</span>
        <label data-start={2}>
          <input
            data-testid="float-type-input-single"
            type="radio"
            name="float-type-input"
            value={32}
            checked={precision === 32}
            onChange={onPrecisionChanged}
          />{' '}
          Single precision (32 bit)
        </label>
        <label data-start={2}>
          <input
            data-testid="float-type-input-double"
            type="radio"
            name="float-type-input"
            value={64}
            checked={precision === 64}
            onChange={onPrecisionChanged}
          />{' '}
          Double precision (64 bit)
        </label>
      </rdcl-input-grid>

      <hr />

      {conditionally(
        numberValue !== 'NaN' && Number.isNaN(number),
        <p>Input cannot be interpreted as a number.</p>,
        () => {
          const bytes = floatToBytes(number, precision)
          const [sign, exponent, mantissa] = deconstructFloat(bytes, precision)
          const parsedExponent = parseExponent(exponent)

          return (
            <>
              <div className="responsive-table-wrapper">
                <table
                  className="simple-table float-analysis"
                  data-testid="float-analysis"
                >
                  <tbody>
                    <tr>
                      <th>Input</th>
                      <td>{number}</td>
                    </tr>

                    <tr>
                      <th>Binary representation</th>
                      <td>{binaryRepresentation(bytes)}</td>
                    </tr>

                    <tr>
                      <th>Deconstructed</th>
                      <td>
                        <span className="sign">{sign}</span>
                        <span className="exponent">
                          {groupDigits(exponent, 8, sign.length)}
                        </span>
                        <span className="mantissa">
                          {groupDigits(
                            mantissa,
                            8,
                            sign.length + exponent.length
                          )}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Hex representation</th>
                      <td>{hexRepresentation(bytes)}</td>
                    </tr>

                    <tr>
                      <th>Scientific notation</th>
                      <td>
                        {conditionally(
                          isMaxExponent(exponent),
                          '-',
                          <>
                            {sign === '0' ? '' : '-'}
                            {conditionally(
                              isZeroExponent(exponent),
                              <>
                                {parseSubnormalMantissa(mantissa)}&times;2
                                <sup>{parsedExponent + 1}</sup>
                              </>,
                              <>
                                {parseNormalMantissa(mantissa)}&times;2
                                <sup>{parsedExponent}</sup>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Explanation</h2>
              <p>
                A floating point number consists of three parts: Its sign, its
                exponent and its mantissa. The sign is represented as either a 0
                (positive) or a 1 (negative). In our case, the sign is{' '}
                <span className="sign">{sign}</span>, so our number is
                <span className="sign">
                  {sign === '0' ? ' positive' : ' negative'}
                </span>
                . The exponent represents a number between
                {conditionally(
                  precision === 32,
                  () => ' -126 and 127 ',
                  () => ' -1022 and 1023 '
                )}
                (since we are considering {precision} bits floating points). To
                get the exponent value, simply interpret the number as an
                unsigned integer, and then subtract{' '}
                {2 ** (exponent.length - 1) - 1}.{' '}
                {conditionally(
                  isZeroExponent(exponent),
                  <>
                    In our case however, the exponent has the minimal value of{' '}
                    <span className="exponent">{exponent}</span>, so we need to
                    follow a different set of rules. We will instead use an
                    exponent of{' '}
                    <span className="exponent">{parsedExponent + 1}</span>.
                    Finally, the mantissa represents the decimal part of the
                    number when written in the form{' '}
                    <i>
                      mantissa&times;2<sup>exponent</sup>
                    </i>
                    . Since we are in the special case where the exponent has
                    the minimal value, this means the mantissa is not
                    normalized. Usually the mantissa would be normalized and
                    would always start with <i>1.&hellip;</i>, but in our case
                    the mantissa will start with <i>0.&hellip;</i>. Our mantissa
                    is <span className="mantissa">{mantissa}</span>, which means
                    that its actual value is{' '}
                    <span className="mantissa">
                      0.{mantissa.replace(/0+$/, '').padEnd(1, '0')}
                    </span>
                    . Converted to decimal, this is{' '}
                    <span className="mantissa">
                      {parseSubnormalMantissa(mantissa)}
                    </span>{' '}
                    (
                    <em>
                      please note that this conversion to decimal may lead to
                      inaccuracies
                    </em>
                    ).
                  </>,
                  conditionally(
                    isMaxExponent(exponent),
                    <>
                      In our case however, the exponent has the maximal value of{' '}
                      <span className="exponent">{exponent}</span>, so we are
                      dealing with a special value. The mantissa is{' '}
                      <span className="mantissa">{mantissa}</span>, which means
                      the value of our float is <i>{number}</i>.
                    </>,
                    <>
                      In our case, the exponent is{' '}
                      <span className="exponent">{exponent}</span>, so its value
                      is <span className="exponent">{parsedExponent}</span>.
                      Finally, the mantissa represents the decimal part of the
                      number when written in the form{' '}
                      <i>
                        mantissa&times;2<sup>exponent</sup>
                      </i>
                      . The mantissa is always stored as a normalized value,
                      which means it always starts with <i>1.&hellip;</i>. To
                      get the mantissa value, just add <i>1.</i> in front of it,
                      and interpret it as a binary number. In our case, the
                      mantissa is <span className="mantissa">{mantissa}</span>,
                      which means that its actual value is{' '}
                      <span className="mantissa">
                        1.{mantissa.replace(/0+$/, '').padEnd(1, '0')}
                      </span>
                      . Converted to decimal, this is{' '}
                      <span className="mantissa">
                        {parseNormalMantissa(mantissa)}
                      </span>{' '}
                      (
                      <em>
                        please note that this conversion to decimal may lead to
                        inaccuracies
                      </em>
                      ).
                    </>
                  )
                )}
              </p>
            </>
          )
        }
      )}
    </>
  )
}

export default Float

function floatToBytes(number: number, precision: FloatPrecision): Uint8Array {
  let buffer: ArrayBuffer
  switch (precision) {
    case 32:
      buffer = new ArrayBuffer(4)
      new DataView(buffer).setFloat32(0, number)
      break
    case 64:
      buffer = new ArrayBuffer(8)
      new DataView(buffer).setFloat64(0, number)
      break
    default:
      throw new Error('Invalid precision')
  }
  return new Uint8Array(buffer)
}

function deconstructFloat(
  bytes: Uint8Array,
  precision: FloatPrecision
): [string, string, string] {
  const str = bytes.reduce<string>(
    (p, c) => p + c.toString(2).padStart(8, '0'),
    ''
  )

  const sign = str[0]
  let exponent: string
  let mantissa: string

  switch (precision) {
    case 32:
      exponent = str.substring(1, 9)
      mantissa = str.substring(9)
      break
    case 64:
      exponent = str.substring(1, 12)
      mantissa = str.substring(12)
      break
    default:
      throw new Error('Invalid precision')
  }

  return [sign, exponent, mantissa]
}

function binaryRepresentation(bytes: Uint8Array): string {
  return bytes
    .reduce<string[]>((p, c) => p.concat(c.toString(2).padStart(8, '0')), [])
    .join(' ')
}

function hexRepresentation(bytes: Uint8Array): string {
  return bytes
    .reduce<string[]>((p, c) => p.concat(c.toString(16).padStart(2, '0')), [])
    .join(' ')
}

function isZeroExponent(exponent: string): boolean {
  return exponent.match(/^0+$/) !== null
}

function isMaxExponent(exponent: string): boolean {
  return exponent.match(/^1+$/) !== null
}

function parseNormalMantissa(mantissa: string): number {
  return parseMantissa(mantissa, 1)
}

function parseSubnormalMantissa(mantissa: string): number {
  return parseMantissa(mantissa, 0)
}

function parseMantissa(mantissa: string, initialValue: 0 | 1): number {
  return mantissa
    .replace(/0+$/, '')
    .split('')
    .reduce<number>((acc, val, idx) => {
      if (val === '1') {
        acc += 2 ** (-idx - 1)
      }
      return acc
    }, initialValue)
}

function parseExponent(exponent: string): number {
  return parseInt(exponent, 2) - (2 ** (exponent.length - 1) - 1)
}

function groupDigits(
  input: string,
  groupSize: number,
  offset: number,
  separator = ' '
): string {
  input = input.padStart(input.length + offset, 'X')
  for (let i = groupSize; i < input.length; i += groupSize + separator.length) {
    input = input.substring(0, i) + separator + input.substring(i)
    if (i < offset) {
      offset += separator.length
    }
  }
  return input.substring(offset)
}
