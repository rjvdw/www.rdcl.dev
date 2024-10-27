import { defineCollection } from 'astro:content'
import botcCharacterSchema from '$content/schema/botc-character'

export const collections = {
  'botc-characters': defineCollection({
    type: 'data',
    schema: botcCharacterSchema,
  }),
}
