import { Orderings } from '@/types/agenda/types'
<template>
  <div>
    <h1>Concert Agenda</h1>

    <FilterMenu
        :filter="filter"
        :venues="venues"
        :expanded="filtersExpanded"
        @toggle="filtersExpanded = !filtersExpanded"
    />

    <p v-if="loading > 0">Een moment geduld, ik ben alles aan het ophalen ⏳.</p>
    <p v-if="errors.length > 0">Hm... Het lijkt er op dat er iets mis is gegaan 🤔.</p>
    <ul v-if="errors.length > 0">
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <Event
        v-for="event in events"
        :key="event.name + event.startDate + event.venue.key"
        :event="event"
        :expanded="event.expanded"
        @toggle="toggle(event)"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Event } from '@/types/agenda/schema'
  import EventCard from '@/components/agenda/EventCard.vue'
  import { Filter, ORDERINGS, Orderings, Venue } from '@/types/agenda/types'
  import FilterMenu from '@/components/agenda/FilterMenu.vue'

  type AgendaResponse = { agenda: Event[] }
  type VenuesResponse = { venues: Venue[] }
  type CollapsibleEvent = Event & { expanded?: boolean, venue: Venue }

  @Component({
    components: { FilterMenu, Event: EventCard }
  })
  export default class Agenda extends Vue {
    private venues: Venue[] = []
    private eventsByVenue: { [venue: string]: CollapsibleEvent[] } = {}
    private filtersExpanded: boolean = false
    private filter: Filter = {
      ordering: Orderings.DATE_ASC,
      venues: {},
    }
    private loading: number = 0
    private errors: string[] = []

    async mounted() {
      await this.fetchVenues()
      await this.fetchEvents()
    }

    private async fetchVenues() {
      try {
        this.loading += 1
        this.errors = []

        const response = await fetch('/.netlify/functions/get_venue')

        if (!response.ok) {
          this.errors.push('Kon lijst van zalen niet ophalen')
          return
        }

        this.venues = (await response.json() as VenuesResponse).venues
        this.filter = {
          ...this.filter,
          venues: Object.fromEntries(this.venues.map(venue => [venue.key, true]))
        }
      } catch(err) {
        console.error(err)
        this.errors.push(err)
      } finally {
        this.loading -= 1
      }
    }

    private async fetchEvents() {
      try {
        this.loading += this.venues.length
        this.errors = []

        await Promise.all(this.venues.map(async venue => {
          try {
            const response = await fetch(`/.netlify/functions/get_venue?venue=${ venue.key }`)

            if (!response.ok) {
              this.errors.push(`Kon geen resultaten ophalen voor ${ venue.name }`)
              return
            }

            const agenda = (await response.json() as AgendaResponse).agenda

            this.eventsByVenue = {
              ...this.eventsByVenue,
              [venue.key]: agenda.map(event => ({ ...event, venue })),
            }
          } finally {
            this.loading -= 1
          }
        }))
      } catch (err) {
        console.error(err)
        this.errors.push(err.message)
      }
    }

    get events(): CollapsibleEvent[] {
      return Object.values(this.eventsByVenue)
        .flat()
        .filter((event: CollapsibleEvent) => {
          if (!this.filter.venues[event.venue.key]) {
            return false
          }

          return true
        })
        .sort(ORDERINGS[this.filter.ordering])
    }

    toggle(event: CollapsibleEvent): void {
      this.eventsByVenue = {
        [event.venue.key]: this.eventsByVenue[event.venue.key]!
          .map(item => item === event ? { ...item, expanded: !item.expanded } : item)
      }
    }
  }
</script>
