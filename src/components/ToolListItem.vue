<template>
  <li>
    <a v-if="noRoute" :href="`/tools/${ tool }.html`">
      <slot name="link-text"></slot>
    </a>
    <router-link v-else :to="`/tools/${ tool }`">
      <slot name="link-text"></slot>
    </router-link>
    <slot></slot>
  </li>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ToolListItem extends Vue {
    @Prop(String) private tool!: string
    @Prop({ type: Boolean, default: false }) private noRoute!: boolean
  }
</script>
