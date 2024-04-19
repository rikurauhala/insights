import ColorContrastChecker from 'color-contrast-checker'
import theme from '~/theme'
import colorMap from './colors.json'

const colors: { [key: string]: string } = {}

for (const key in colorMap) {
  if (Object.prototype.hasOwnProperty.call(colorMap, key)) {
    colors[key.toLowerCase()] = colorMap[key as keyof typeof colorMap]
  }
}

const colorContrastChecker = new ColorContrastChecker()

/**
 * Returns a random color from a predefined list.
 *
 * @returns {string} The color in hexadecimal format.
 * @example getRandomColor() // Returns '#f1e05a'
 */
const getRandomColor = (): string => {
  return colors[Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]]
}

/**
 * Returns a random color that has a high contrast with the background.
 *
 * @returns {string} The color in hexadecimal format.
 * @example getRandomContrastColor() // Returns '#f1e05a'
 */
const getRandomContrastColor = (): string => {
  let contrastColor = getRandomColor()
  const backgroundColor = theme.palette.background.paper
  while (!colorContrastChecker.isLevelAA(backgroundColor, contrastColor)) {
    contrastColor = getRandomColor()
  }
  return contrastColor
}

/**
 * Formats a timestamp to a human-readable date.
 *
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} The formatted date.
 * @example formatTimestamp('2024-04-19T00:00:00Z') // Returns '19 April 2024'
 */
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleDateString('en-UK', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Returns a predetermined color for a given key.
 * If a key is not found, a random color is returned.
 *
 * The colors are based on the GitHub language colors.
 *
 * @param {string} key - The key to get the color for.
 * @returns {string} The color in hexadecimal format.
 * @example getColor('JavaScript') // Returns '#f1e05a'
 */
export const getColor = (key: string): string => {
  return colors[key.toLowerCase() as keyof typeof colors] || getRandomContrastColor()
}
