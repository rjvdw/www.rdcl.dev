import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => <>
  <h1>Tools</h1>

  <rdcl-tools>
    <rdcl-tool-link>
      <a slot="link" href="/password.html" data-no-history>Generate Password</a>
      Securely generates a password using <code>window.crypto</code>.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/ascii">ASCII Converter</Link>
      Converts between ASCII and plain text.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/timestamp">Timestamp</Link>
      Convert between Unix timestamps and ISO formatted dates.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/html">HTML Elements</Link>
      Demonstrations of assorted HTML elements.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/qr">QR</Link>
      Create QR codes.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/countdown">Countdown</Link>
      Solves the numbers game in Countdown.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/drop-rates">Drop Rate Calculator</Link>
      Given a drop rate, computes how many attempts you actually need to get your item.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/conversions">Common Unit Conversions</Link>
      Quickly convert common units into each other.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/bmi">BMI Calculator</Link>
      Body Mass Index calculator.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/ratings">How to read a rating</Link>
      Given how many reviews out of a total number of reviews are positive, computes a score.
    </rdcl-tool-link>
  </rdcl-tools>
</>
