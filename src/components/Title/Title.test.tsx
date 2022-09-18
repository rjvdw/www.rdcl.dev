import { render as r } from '@testing-library/react'
import React from 'react'
import { Title } from './Title'
import { TitleProvider } from './index'

const render = (ui: React.ReactElement) => r(
  <TitleProvider value="initial title">{ ui }</TitleProvider>,
)

it('renders the default title', () => {
  render(<Title/>)
  expect(document.title).toBe('initial title')
})

it('renders a specific title', () => {
  render(<Title>some specific title</Title>)
  expect(document.title).toBe('some specific title | initial title')
})

it('renders a specific title with a prefix', () => {
  render(<Title prefix="prefix">some specific title</Title>)
  expect(document.title).toBe('some specific title | prefix | initial title')
})

it('renders a specific title with a multi-part prefix', () => {
  render(<Title prefix={ ['prefix1', 'prefix2'] }>some specific title</Title>)
  expect(document.title).toBe('some specific title | prefix2 | prefix1 | initial title')
})

it('renders a title with just a prefix', () => {
  render(<Title prefix="prefix"/>)
  expect(document.title).toBe('prefix | initial title')
})

it('renders using a custom separator', () => {
  render(<Title prefix="prefix" separator=" :: ">some specific title</Title>)
  expect(document.title).toBe('some specific title :: prefix :: initial title')
})

it('omits empty parts', () => {
  render(<Title prefix={ ['prefix1', '', 'prefix2'] }>some specific title</Title>)
  expect(document.title).toBe('some specific title | prefix2 | prefix1 | initial title')
})
