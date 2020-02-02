<template>
  <div>
    <h1>Concert Agenda</h1>

    <section
        :class="`event ${ event.expanded ? 'event--expanded' : 'event--collapsed' }`"
        v-for="event in events"
        @click="toggle(event)"
        tabindex="0"
    >
      <header class="event__header">
        <h2 class="event__name">{{ event.name }}</h2>

        <p class="event__tickets">
          Kaartjes:
          <a :href="event.offers.url" target="_blank" rel="noopener noreferrer" @click.stop>
            {{ availability(event) }} (prijs: {{ price(event) }})
          </a>
        </p>

        <p class="event__time">
          <time :datetime="event.startDate">{{ event.startDate | formatDateTime }}</time>
        </p>
      </header>

      <p v-if="event.expanded"
         v-for="paragraph in paragraphs(event.description)"
      >
        {{ paragraph }}
      </p>

      <footer class="event__footer">
        <p class="event__venue">
          Locatie:
          <a :href="event.url" target="_blank" rel="noopener noreferrer" @click.stop>
            {{ event.location.name }}
          </a>
        </p>
        <address class="event__address">
          {{  event.location.address }}
        </address>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Event } from '@/types/schema'

  type Response = {
    agenda: Event[],
  }

  type Venue = {
    name: string,
    events: Event[],
  }

  type EventItem = Event & { expanded?: boolean }

  @Component
  export default class Agenda extends Vue {
    private static readonly currencyFormatters: { [currency: string]: Intl.NumberFormat } = {
      EUR: new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
      }),
    }

    private readonly venues = [
      'doornroosje',
    ]

    private events: EventItem[] = []

    async mounted() {
      this.events = (await Promise.all(
        this.venues.map(async name => {
          const response = await fetch(`/.netlify/functions/get_venue?venue=${ name }`)

          if (!response.ok) {
            console.error(`Unable to fetch results for venue '${ name }'`)
            return []
          }

          return (await response.json() as Response).agenda
        })
      ))
        .flat()
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
    }

    toggle(event: EventItem): void {
      this.events = this.events.map(item => item === event ? { ...item, expanded: !item.expanded } : item)
    }

    paragraphs(text: string): string[] {
      return text.split(/\s*\n+\s*/g)
    }

    availability(event: Event): string {
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

    price(event: Event): string {
      const { priceCurrency, price } = event.offers

      if (Agenda.currencyFormatters[priceCurrency]) {
        return Agenda.currencyFormatters[priceCurrency].format(parseFloat(price))
      }

      return `${ priceCurrency } ${ price }`
    }
  }
</script>

<style scoped lang="sass">
  .event
    background: #fff
    font-size: .9rem
    margin-bottom: 1rem
    border: thin solid #999
    padding: .5rem
    box-shadow: .125rem .125rem .25rem #0005

    &--expanded &__header
      border-bottom: thin solid #ccc
      margin-bottom: 1rem

    &__name
      font-size: 1.1rem
      margin: 0

    &__time
      color: #666

    &__footer
      border-top: thin solid #ccc
      margin-top: .5rem
      padding-top: .5rem
      text-align: right

    &__venue
      margin: 0

    &__address
      font-style: normal

    @media screen and (min-width: 25rem)
      &__header
        display: grid
        grid-template-columns: 1fr max-content

      &__name
        grid-column: span 2
</style>
