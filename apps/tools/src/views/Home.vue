<template>
  <div>
    <h1>Tools</h1>

    <ToolList>
      <ToolListItem tool="password" no-route>
        <template v-slot:link-text>Generate Password</template>
        Securely generates a password using <code>window.crypto</code>
      </ToolListItem>
      <ToolListItem tool="countdown">
        <template v-slot:link-text>Countdown</template>
        Solves the numbers game in Countdown
      </ToolListItem>
      <ToolListItem tool="droprates">
        <template v-slot:link-text>Drop Rate Calculator</template>
        Given a droprate, computes how many attempts you actually need to get your item
      </ToolListItem>
      <ToolListItem tool="lingo">
        <template v-slot:link-text>Lingo</template>
        An implementation of the dutch word game, Lingo
      </ToolListItem>
      <ToolListItem tool="conway">
        <template v-slot:link-text>Conway's Game of Life</template>
        An implementation of Conway’s Game of Life
      </ToolListItem>
      <ToolListItem tool="galton">
        <template v-slot:link-text>Galton Board</template>
        An implementation of a Galton Board
      </ToolListItem>
    </ToolList>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import ToolList from '@/components/ToolList.vue'
  import ToolListItem from '@/components/ToolListItem.vue'

  @Component({
    components: {
      ToolList,
      ToolListItem,
    },
  })
  export default class Home extends Vue {
  }
</script>
