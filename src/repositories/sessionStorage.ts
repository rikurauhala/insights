/**
 * Reads a value from the session storage.
 *
 * @param {string} key - The key to read the value from.
 * @returns {unknown | null} The value stored at the key, or null if the key does not exist.
 */
const read = (key: string): unknown | null => {
  const value = sessionStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

/**
 * Writes a value to the session storage.
 *
 * @param {string} key - The key to write the value to.
 * @param value - The value to write.
 */
const write = (key: string, value: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export default { read, write }
