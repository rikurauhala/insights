import { CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Info from '~/components/Info'
import Languages from '~/components/Languages'
import Section from '~/components/Section'
import { theme } from '~/theme'

import './App.css'

const content = [
  {
    key: 'info',
    component: <Info />,
  },
  {
    key: 'languages',
    title: 'Languages',
    description: 'Top programming languages',
    component: <Languages />,
  },
]

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">
      {content.map(({ key, title, description, component }, index) => (
        <Box sx={{ marginBottom: index === content.length - 1 ? '20px' : 0 }}>
          <Section key={key} title={title} description={description}>
            {component}
          </Section>
        </Box>
      ))}
    </Container>
  </ThemeProvider>
)

export default App
