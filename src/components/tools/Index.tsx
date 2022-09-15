import React from 'react'
import { Link } from 'react-router-dom'

export const Index = () => <>
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
      <Link slot="link" to="/tools/float">Float Calculator</Link>
      Calculator to help with floating point numbers.
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
      <Link slot="link" to="/tools/countdown">Countdown</Link>
      Solves the numbers game in Countdown.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/drop-rates">Drop Rate Calculator</Link>
      Given a drop rate, computes how many attempts you actually need to get your item.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/bmi">BMI Calculator</Link>
      Body Mass Index calculator.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/markdown-viewer">Markdown viewer</Link>
      View a markdown file in your browser.
    </rdcl-tool-link>
    <rdcl-tool-link>
      <Link slot="link" to="/tools/ratings">How to read a rating</Link>
      Given how many reviews out of a total number of reviews are positive, computes a score.
    </rdcl-tool-link>
  </rdcl-tools>
</>
