interface FormSubmitEvent extends SubmitEvent {
  target: HTMLFormElement
}

/**
 * Checks whether the received event is actually a SubmitEvent on a HTMLFormElement.
 *
 * This should not be necessary, but due to preact's typings, this check is needed for everything to work.
 */
export function isFormSubmitEvent(event: Event): event is FormSubmitEvent {
  return event.type === 'submit' && event.target instanceof HTMLFormElement
}
