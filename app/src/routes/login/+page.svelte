<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<h1>Log in</h1>
{#if form?.success}
  <p>Login request sent successfully, please wait for an e-mail.</p>
{:else}
  <form method="POST">
    <section class="form-grid">
      <label for="login:email">Username</label>
      <input
        id="login:email"
        name="email"
        type="text"
        autocomplete="username"
        required
      />
      <button data-start="2">Log in</button>
      {#if form?.errors}
        <p data-start="2" class="error">{form?.errors.join(', ')}</p>
      {/if}
    </section>
  </form>
{/if}

<style>
  form {
    max-inline-size: 35rem;
  }
</style>
