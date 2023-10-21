import { sequence } from 'astro:middleware'
import { onRequest as auth } from './auth'

export const onRequest = sequence(auth)
