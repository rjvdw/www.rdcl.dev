// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Jwt } from '$lib/jwt'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      jwt?: Jwt
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
