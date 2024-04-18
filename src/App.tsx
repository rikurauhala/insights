import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Info from '~/components/Info'
import Languages from '~/components/Languages'
import Section from '~/components/Section'
import theme from '~/theme'

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
      {content.map(({ key, title, description, component }) => (
        <Section key={key} title={title} description={description}>
          {component}
        </Section>
      ))}
    </Container>
  </ThemeProvider>
)

export default App
