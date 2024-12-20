import type { JRD } from './types'

/**
 * Merge two JRD objects.
 *
 * @param one
 * @param other
 */
export function mergeJrd(one: JRD, other: JRD): JRD {
  const merged: JRD = {
    subject: one.subject,
  }

  const mergedAliases = mergeLists(one.aliases, other.aliases)
  if (mergedAliases) {
    merged.aliases = mergedAliases
  }

  const mergedProperties = mergeObjects(one.properties, other.properties)
  if (mergedProperties) {
    merged.properties = mergedProperties
  }

  const mergedLinks = mergeLists(one.links, other.links)
  if (mergedLinks) {
    merged.links = mergedLinks
  }

  return merged
}

/**
 * Merge two lists that may or may not be undefined.
 *
 * The first list takes precedence over the second list, i.e. is put at the start of the merged list.
 *
 * @param l1
 * @param l2
 */
function mergeLists<T>(l1: T[] | undefined, l2: T[] | undefined): T[] | undefined {
  return l2 ? (l1 ?? []).concat(l2) : l1
}

/**
 * Merge two objects that may or may not be undefined
 *
 * The first object takes precedence over the second object, i.e. will overwrite any keys from the second object.
 *
 * @param o1
 * @param o2
 */
function mergeObjects<K extends string | number | symbol, V>(
  o1: Record<K, V> | undefined,
  o2: Record<K, V> | undefined,
): Record<K, V> | undefined {
  if (!o1) {
    return o2
  }

  if (!o2) {
    return o1
  }

  return {
    ...o2,
    ...o1,
  }
}
