import { z } from 'astro:content'

const nightSchema = z.object({
  order: z.number(),
  description: z.string(),
})

export default z.object({
  name: z.string(),
  source: z.string().url(),
  type: z.enum(['Townsfolk', 'Outsider', 'Minion', 'Demon', 'Fabled', 'Traveller']),
  game: z.string(),
  tagLine: z.string(),
  nightOrder: z
    .object({
      first: nightSchema.optional(),
      other: nightSchema.optional(),
    })
    .optional(),
})
