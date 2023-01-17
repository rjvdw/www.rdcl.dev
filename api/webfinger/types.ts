/**
 * JSON Resource Descriptor (JRD), as specified in RFC 6415.
 */
export type JRD = {
  /**
   * URI identifying the entity described by this JRD.
   */
  subject: string

  /**
   * List of URI strings that identify the same entity as the `subject` URI.
   */
  aliases?: string[]

  /**
   * Additional information about the subject in the form of name/value pairs.
   *
   * The names (aka "property identifiers") are URIs.
   * The values are strings or null.
   */
  properties?: Record<string, string>

  /**
   * Links relating to the subject.
   */
  links?: Link[]
}

/**
 * A link in a JRD.
 */
export type Link = {
  /**
   * The relation type.
   */
  rel: string

  /**
   * The target URI.
   */
  href?: string

  /**
   * The media type of the target resource.
   */
  type?: string

  /**
   * Human-readable texts describing the link relation in the form of name/value pairs.
   *
   * The names are either language tags or undefined (`"und"`).
   * The values contain text in the specified language.
   */
  titles?: Record<string, string>

  /**
   * Additional information about the link in the form of name/value pairs.
   *
   * The names (aka "property identifiers") are URIs.
   * The values are strings or null.
   */
  properties: Record<string, string>
}
