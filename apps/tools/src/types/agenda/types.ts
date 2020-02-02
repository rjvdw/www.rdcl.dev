import { Event } from '@/types/agenda/schema'

export type Ordering = (a: Event, b: Event) => number

export enum Venues {
  // BOERDERIJ = 'boerderij',
  // BOSUIL = 'bosuil',
  DOORNROOSJE = 'doornroosje',
  // NULDERTIEN = '013',
  // PATRONAAT = 'patronaat',
}

export const VENUE_NAMES: { [venue in Venues]: string } = {
  // [Venues.BOERDERIJ]: 'Cultuurpodium Boerderij',
  // [Venues.BOSUIL]: 'Poppodium de Bosuil',
  [Venues.DOORNROOSJE]: 'Doornroosje',
  // [Venues.NULDERTIEN]: '013 Poppodium Tilburg',
  // [Venues.PATRONAAT]: 'Patronaat',
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
