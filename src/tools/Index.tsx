import React from 'react'
import { Title } from '../components/Title'
import { ToolLink } from '../components/ToolLink'

export const Index = () => <>
  <Title>tools</Title>
  <h1>Tools</h1>

  <rdcl-tools>
    <ToolLink href="/password.html" title="Generate Password">
      Securely generates a password using <code>window.crypto</code>.
    </ToolLink>
    <ToolLink to="/tools/ascii" title="ASCII Converter">
      Converts between ASCII and plain text.
    </ToolLink>
    <ToolLink to="/tools/float" title="Float Calculator">
      Calculator to help with floating point numbers.
    </ToolLink>
    <ToolLink to="/tools/timestamp" title="Timestamp">
      Convert between Unix timestamps and ISO formatted dates.
    </ToolLink>
    <ToolLink to="/tools/html" title="HTML Elements">
      Demonstrations of assorted HTML elements.
    </ToolLink>
    <ToolLink to="/tools/countdown" title="Countdown">
      Solves the numbers game in Countdown.
    </ToolLink>
    <ToolLink to="/tools/drop-rates" title="Drop Rate Calculator">
      Given a drop rate, computes how many attempts you actually need to get your item.
    </ToolLink>
    <ToolLink to="/tools/bmi" title="BMI Calculator">
      Body Mass Index calculator.
    </ToolLink>
    <ToolLink to="/tools/markdown-viewer" title="Markdown viewer">
      View a markdown file in your browser.
    </ToolLink>
    <ToolLink to="/tools/ratings" title="How to read a rating">
      Given how many reviews out of a total number of reviews are positive, computes a score.
    </ToolLink>
  </rdcl-tools>
</>
