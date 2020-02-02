export type ItemAvailability = 'http://schema.org/Discontinued'
  | 'http://schema.org/InStock'
  | 'http://schema.org/InStoreOnly'
  | 'http://schema.org/LimitedAvailability'
  | 'http://schema.org/OnlineOnly'
  | 'http://schema.org/OutOfStock'
  | 'http://schema.org/PreOrder'
  | 'http://schema.org/PreSale'
  | 'http://schema.org/SoldOut'

export type Place = {
  '@type': 'Place',
  name: string,
  sameAs: string,
  address: string,
}

export type Offer = {
  '@type': 'Offer',
  url: string,
  price: string,
  priceCurrency: string,
  availability: ItemAvailability,
  validFrom: string,
}

export type Event = {
  '@context': 'http://schema.org'
  '@type': 'Event',
  name: string,
  url: string,
  image: string,
  startDate: string,
  endDate: string,
  description: string,
  location: Place,
  offers: Offer,
}
