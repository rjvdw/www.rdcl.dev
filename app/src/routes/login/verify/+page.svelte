<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>log in | rdcl.dev</title>
</svelte:head>

<h1>Log in</h1>

{#if data?.success}
  <p>Log in successful!</p>
{:else}
  <p class="error">
    Log in failed!
    {#if data?.errors}
      {data?.errors.join(', ')}
    {/if}
  </p>
{/if}
