/**
 * Content in `src/content` carries `TODO:` placeholders for facts Finwave has
 * not confirmed yet. They are useful in the source, but must never reach the
 * page — several were rendering as live feature bullets and FAQ answers.
 */

/** True when a string is a placeholder standing in for unconfirmed copy. */
export function isPlaceholder(text: string): boolean {
  return /^\s*TODO\b/i.test(text);
}

/** Drops placeholder entries from a list of strings. */
export function withoutPlaceholders(items: readonly string[]): string[] {
  return items.filter((item) => !isPlaceholder(item));
}

/**
 * Removes a trailing "TODO: …" sentence from prose, keeping the real copy that
 * precedes it (e.g. the corporate-FX description).
 */
export function stripTrailingPlaceholder(text: string): string {
  return text.replace(/\s*TODO:[^]*$/i, "").trim();
}

/** Keeps only question/answer pairs whose answer is real copy. */
export function answeredFaqs<T extends { a: string }>(faqs: readonly T[]): T[] {
  return faqs.filter((faq) => !isPlaceholder(faq.a));
}
