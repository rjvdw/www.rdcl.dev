<template>
  <section
      :class="`event ${ expanded ? 'event--expanded' : 'event--collapsed' }`"
      @click="toggle"
      @keyup.enter.self="toggle"
      tabindex="0"
  >
    <header class="event__header">
      <h2 class="event__name">{{ event.name }}</h2>

      <p class="event__tickets">
        Kaartjes:
        <a :href="event.offers.url" target="_blank" rel="noopener noreferrer" @click.stop>
          {{ availability(event) }}
          <span v-if="event.offers.price">(prijs: {{ price(event) }})</span>
        </a>
      </p>

      <p class="event__time">
        <time :datetime="event.startDate">{{ event.startDate | formatDateTime }}</time>
      </p>
    </header>

    <div class="event__description">
      <p v-for="paragraph in paragraphs(event.description)">{{ paragraph }}</p>
    </div>

    <footer class="event__footer">
      <p class="event__venue">
        Locatie:
        <a :href="event.url" target="_blank" rel="noopener noreferrer" @click.stop>
          {{ event.location.name }}
        </a>
      </p>
      <address class="event__address">
        {{ event.location.address }}
      </address>
    </footer>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Event } from '@/types/agenda/schema'

  const currencyFormatters: { [currency: string]: Intl.NumberFormat } = {
    EUR: getCurrencyFormatter('nl-NL', 'EUR'),
    GBP: getCurrencyFormatter('en-UK', 'GBP'),
    USD: getCurrencyFormatter('en-US', 'USD'),
  }

  @Component
  export default class EventCard extends Vue {
    @Prop(Object) private event!: Event
    @Prop(Boolean) private expanded!: boolean

    // noinspection JSUnusedLocalSymbols
    private toggle() {
      this.$emit('toggle')
    }

    // noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
    private paragraphs(text: string): string[] {
      return text.split(/\s*\n+\s*/g)
    }

    // noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
    private availability(event: Event): string {
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

    // noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
    private price(event: Event): string {
      const { priceCurrency, price } = event.offers

      if (currencyFormatters[priceCurrency]) {
        return currencyFormatters[priceCurrency].format(parseFloat(price))
      }

      return `${ priceCurrency } ${ price }`
    }
  }

  function getCurrencyFormatter(locale: string, currency: string): Intl.NumberFormat {
    return new Intl.NumberFormat(locale, { style: 'currency', currency })
  }
</script>

<style lang="sass">
  @import "styles"

  .event
    @include card

    &--expanded &__header
      border-bottom: thin solid #ccc
      margin-bottom: 1rem

    &__name
      font-size: 1.1rem
      margin: 0

    &__time
      color: #666

    &__description
      overflow: hidden

    &--collapsed &__description
      height: 0

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
