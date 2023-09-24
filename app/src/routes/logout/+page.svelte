<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<svelte:head>
  <title>log out | rdcl.dev</title>
</svelte:head>

<h1>Log out</h1>
{#if form?.success}
  <p>Logged out successfully.</p>
{:else}
  <form method="POST">
    <button>Log out</button>
  </form>
{/if}
