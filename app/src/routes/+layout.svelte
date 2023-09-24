<script lang="ts">
  import type { LayoutData } from './$types'
  import '../styles/main.scss'

  export let data: LayoutData
</script>

<header>
  {#if data.user.loggedIn}
    <p>Logged in as: {data.user.displayName}</p>
  {/if}
</header>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/tools">Tools</a></li>
    {#if data.user.loggedIn}
      <li><a href="/logout">Log out</a></li>
    {:else}
      <li><a href="/login">Log in</a></li>
    {/if}
  </ul>
</nav>

<main>
  <slot />
</main>
