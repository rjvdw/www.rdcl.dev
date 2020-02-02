import { Event } from '@/types/agenda/schema'

export type Ordering = (a: Event, b: Event) => number

export enum Venues {
  DOORNROOSJE = 'doornroosje',
}

export enum Orderings {
  DATE_ASC = 'date ascending',
  DATE_DESC = 'date descending',
  PRICE_ASC = 'price ascending',
  PRICE_DESC = 'price descending',
}

export type Filter = {
  venues: { [key in Venues]: boolean }
}
