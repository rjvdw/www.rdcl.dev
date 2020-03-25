import React from 'react'
import './Agenda.styles.sass'
import { axios } from '../../axios'
import { formatDateTime } from '../../util/formatters'

const ORDERINGS = {
  'date ascending': (a, b) => a.startDate.localeCompare(b.startDate),
  'date descending': (a, b) => b.startDate.localeCompare(a.startDate),
  'price ascending': (a, b) => parseFloat(a.offers.price) - parseFloat(b.offers.price),
  'price descending': (a, b) => parseFloat(b.offers.price) - parseFloat(a.offers.price),
}

export class Agenda extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      loadingVenues: false,
      loadingEvents: false,
      venues: [],
      events: [],
      error: false,
      filter: {
        ordering: 'date ascending',
        venues: {},
      },
    }
  }

  componentDidMount() {
    this.fetch()
  }

  async fetch() {
    try {
      this.setState(state => ({
        ...state,
        loadingVenues: true,
      }))

      const response = await axios.get('/venues')

      this.setState(state => ({
        ...state,
        loadingVenues: false,
        loadingEvents: true,
        venues: response.data.venues,
        events: [],
        filter: {
          ...state.filter,
          venues: Object.fromEntries(response.data.venues.map(venue => [venue.key, true])),
        },
      }))

      await Promise.all(
        response.data.venues.map(async venue => {
          const response = await axios.get(`/venues/${ venue.key }`)

          this.setState(state => ({
            ...state,
            events: state.events.concat(
              response.data.agenda.map(ev => ({ ...ev, venue })),
            ),
          }))
        })
      )

      this.setState(state => ({
        ...state,
        loadingEvents: false,
      }))
    } catch (err) {
      console.error(err)
      this.setState(state => ({
        ...state,
        loadingVenues: false,
        loadingEvents: false,
        error: true,
      }))
    }
  }

  getEvents() {
    return this.state.events
      .filter(event => this.state.filter.venues[event.venue.key])
      .sort(ORDERINGS[this.state.filter.ordering])
  }

  render() {
    const { filter, events, venues, loadingVenues, loadingEvents, error } = this.state

    return <>
      <h1>Concert Agenda</h1>

      <FilterMenu
        venues={ venues }
        events={ events }
        ordering={ filter.ordering }
        setOrdering={ ordering => this.setState(state => ({
          ...state,
          filter: {
            ...state.filter,
            ordering,
          },
        })) }
        filters={ filter.venues }
        setFilter={ (key, value) => this.setState(state => ({
          ...state,
          filter: {
            ...state.filter,
            venues: {
              ...state.filter.venues,
              [key]: value,
            },
          },
        })) }
      />

      { loadingVenues || loadingEvents && (
        <p>Een moment geduld, ik ben alles aan het ophalen ⏳.</p>
      ) }

      { error && (
        <p>Hm... Het lijkt er op dat er iets mis is gegaan 🤔.</p>
      ) }

      { this.getEvents().map(event => (
        <EventCard
          key={ event.name + event.startDate + event.venue.key }
          event={ event }
        />
      )) }
    </>
  }
}

const FilterMenu = ({ venues, events, ordering, setOrdering, filters, setFilter }) => (
  <nav className="ca-filters">
    <header className="ca-filters__header">
      <h2 className="ca-filters__title">Filteren</h2>
    </header>

    <form>
      <section className="ca-filters__section">
        <h3 className="ca-filters__section-header">Zalen</h3>
        <div className="ca-filters__venues">
          { venues.map(venue => (
            <label key={ venue.key } className="ca-filters__venue">
              <input
                type="checkbox"
                checked={ filters[venue.key] }
                onChange={ event => setFilter(venue.key, event.target.checked) }
              />&nbsp;
              { venue.name } ({ events.filter(event => event.venue.key === venue.key).length })
            </label>
          )) }
        </div>
      </section>

      <section className="ca-filters__section">
        <h3 className="ca-filters__section-header">Sortering</h3>

        <label>
          Sorteer op&nbsp;
          <select
            className="ca-filters__orderings"
            value={ ordering }
            onChange={ event => setOrdering(event.target.value) }
          >
            <option value="date ascending">Datum (oplopend)</option>
            <option value="date descending">Datum (aflopend)</option>
            <option value="price ascending">Prijs (oplopend)</option>
            <option value="price descending">Prijs (aflopend)</option>
          </select>
        </label>
      </section>
    </form>
  </nav>
)

const EventCard = ({ event }) => (
  <section className="ca-event">
    <header className="ca-event__header">
      <h2 className="ca-event__name">{ event.name }</h2>

      <p className="ca-event__tickets">
        Kaartjes:&nbsp;
        <a href={ event.offers.url } target="_blank" rel="noopener noreferrer">
          { event.offers.price ? `${ availability(event) } (prijs: ${ price(event) })` : '' }
        </a>
      </p>

      <p className="ca-event__time">
        <time dateTime={ event.startDate }>{ formatDateTime(event.startDate) }</time>
      </p>
    </header>

    <div className="ca-event__description">
      { paragraphs(event.description).map((paragraph, key) =>
        <p key={ key }>{ paragraph }</p>
      ) }
    </div>

    <footer className="ca-event__footer">
      <p className="ca-event__venue">
        Locatie:&nbsp;
        <a href={ event.url } target="_blank" rel="noopener noreferrer">
          { event.location.name }
        </a>
      </p>
      <address className="ca-event__address">
        { event.location.address }
      </address>
    </footer>
  </section>
)

function availability(event) {
  switch (event.offers.availability) {
    case 'http://schema.org/Discontinued':
      return 'Afgelast'
    case 'http://schema.org/InStock':
      return 'Beschikbaar'
    case 'http://schema.org/InStoreOnly':
      return 'Beschikbaar (alleen bij de kassa)'
    case 'http://schema.org/LimitedAvailability':
      return 'Beperkt beschikbaar'
    case 'http://schema.org/OnlineOnly':
      return 'Beschikbaar (alleen online)'
    case 'http://schema.org/OutOfStock':
      return 'Uitverkocht'
    case 'http://schema.org/PreOrder':
      return 'Pre-order'
    case 'http://schema.org/PreSale':
      return 'Voorverkoop'
    case 'http://schema.org/SoldOut':
      return 'Uitverkocht'
    default:
      return event.offers.availability
  }
}

const currencyFormatters = {
  EUR: getCurrencyFormatter('nl-NL', 'EUR'),
  GBP: getCurrencyFormatter('en-UK', 'GBP'),
  USD: getCurrencyFormatter('en-US', 'USD'),
}

function price(event) {
  const { priceCurrency, price } = event.offers

  if (currencyFormatters[priceCurrency]) {
    return currencyFormatters[priceCurrency].format(parseFloat(price))
  }

  return `${ priceCurrency } ${ price }`
}

function getCurrencyFormatter(locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
}

function paragraphs(text) {
  return text.split(/\s*\n+\s*/g)
}
