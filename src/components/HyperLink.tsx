import Link from '@mui/material/Link'

interface HyperLinkProps {
  href: string
  text: string
}

/**
 * A wrapper for external hyperlinks. Opens links in a new tab.
 *
 * @param {string} href - The URL of the hyperlink.
 * @param {string} text - The text to display.
 * @returns {JSX.Element} A new HyperLink component.
 */
const HyperLink = ({ href, text }: HyperLinkProps): JSX.Element => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </Link>
)

export default HyperLink
