import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import WarningIcon from '@mui/icons-material/Warning'

interface HyperLinkProps {
  href: string
  text: string
}

const HyperLink = ({ href, text }: HyperLinkProps): JSX.Element => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </Link>
)

const NoToken = (): JSX.Element => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: '100px', textAlign: 'center' }}>
        <WarningIcon color="warning" sx={{ fontSize: '100px' }} />
        <Typography component="h1" variant="h4">
          Token not found
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          To use the application, you must provide a{' '}
          <HyperLink
            href="'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens'"
            text="personal access token"
          />
          . Please add it to a file named <code>.env</code> at the root of the project. Restart the
          application after adding the token.
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          The file should contain the line{' '}
          <code>
            VITE_TOKEN=<i>your-token-here</i>
          </code>
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          You can create a new token on{' '}
          <HyperLink href="https://github.com/settings/tokens" text="GitHub" />.
        </Typography>
      </Box>
    </Container>
  )
}

export default NoToken
