import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Commits from '~/components/Commits'
import Footer from '~/components/Footer'
import Info from '~/components/Info'
import IssuesAndPullRequests from '~/components/IssuesAndPullRequests'
import Languages from '~/components/Languages'
import NoToken from '~/components/NoToken'
import Topics from '~/components/Topics'

import theme from '~/theme'
import { TOKEN } from './config'

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        {!TOKEN ? (
          <NoToken />
        ) : (
          <Box>
            <Info />
            <Commits />
            <IssuesAndPullRequests />
            <Languages />
            <Topics />
            <Footer />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
