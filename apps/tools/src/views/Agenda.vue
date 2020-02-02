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
        :key="event.name + event.startDate + event.venue"
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
  import { Filter, ORDERINGS, Orderings, VENUE_NAMES, Venues } from '@/types/agenda/types'
  import FilterMenu from '@/components/agenda/FilterMenu.vue'

  type Response = { agenda: Event[] }
  type CollapsibleEvent = Event & { expanded?: boolean, venue: Venues }

  @Component({
    components: { FilterMenu, Event: EventCard }
  })
  export default class Agenda extends Vue {
    private readonly venues: Venues[] = Object.values(Venues)
    private eventsByVenue: { [venue in Venues]?: CollapsibleEvent[] } = {}
    private filtersExpanded: boolean = false
    private filter: Filter = {
      ordering: Orderings.DATE_ASC,
      venues: {
        // [Venues.BOERDERIJ]: true,
        // [Venues.BOSUIL]: true,
        [Venues.DOORNROOSJE]: true,
        // [Venues.NULDERTIEN]: true,
        // [Venues.PATRONAAT]: true,
      },
    }
    private loading: number = 0
    private errors: string[] = []

    mounted() {
      this.fetchData()
    }

    private async fetchData() {
      try {
        this.loading = this.venues.length
        this.errors = []

        await Promise.all(this.venues.map(async venue => {
          try {
            const response = await fetch(`/.netlify/functions/get_venue?venue=${ venue }`)

            if (!response.ok) {
              this.errors.push(`Kon geen resultaten ophalen voor ${ VENUE_NAMES[venue] }`)
              return
            }

            const agenda = (await response.json() as Response).agenda

            this.eventsByVenue = {
              ...this.eventsByVenue,
              [venue]: agenda.map(event => ({ ...event, venue })),
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
          if (!this.filter.venues[event.venue]) {
            return false
          }

          return true
        })
        .sort(ORDERINGS[this.filter.ordering])
    }

    toggle(event: CollapsibleEvent): void {
      this.eventsByVenue = {
        [event.venue]: this.eventsByVenue[event.venue]!
          .map(item => item === event ? { ...item, expanded: !item.expanded } : item)
      }
    }
  }
</script>
