<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<p class="error">
  Log in failed!
  {#if data?.errors}
    {data?.errors.join(', ')}
  {/if}
</p>
