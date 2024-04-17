import { CssBaseline, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'

import Info from '~/components/Info'
import Languages from '~/components/Languages'
import Section from '~/components/Section'
import { theme } from '~/theme'

import './App.css'

const content = [
  {
    title: 'Languages',
    description: 'Top programming languages',
    component: <Languages />,
  },
]

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">
      <Info />
      {content.map(({ title, description, component }) => (
        <Section key={title} title={title} description={description}>
          {component}
        </Section>
      ))}
    </Container>
  </ThemeProvider>
)

export default App
