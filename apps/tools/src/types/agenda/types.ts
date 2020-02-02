import { Event } from '@/types/agenda/schema'


export type Venue = {
  key: string
  name: string
}


export type Ordering = (a: Event, b: Event) => number

export enum Orderings {
  DATE_ASC = 'date ascending',
  DATE_DESC = 'date descending',
  PRICE_ASC = 'price ascending',
  PRICE_DESC = 'price descending',
}

export const ORDERINGS: { [key in Orderings]: Ordering } = {
  [Orderings.DATE_ASC]: (a, b) => a.startDate.localeCompare(b.startDate),
  [Orderings.DATE_DESC]: (a, b) => b.startDate.localeCompare(a.startDate),
  [Orderings.PRICE_ASC]: (a, b) => parseFloat(a.offers.price) - parseFloat(b.offers.price),
  [Orderings.PRICE_DESC]: (a, b) => parseFloat(b.offers.price) - parseFloat(a.offers.price),
}


export type Filter = {
  ordering: Orderings
  venues: { [key: string]: boolean }
}
