import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Footer from '~/components/Footer'
import Info from '~/components/Info'
import Languages from '~/components/Languages'
import Section from '~/components/Section'
import Topics from '~/components/Topics'
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
  {
    key: 'topics',
    title: 'Topics',
    description: 'Top repository topics',
    component: <Topics />,
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
      <Footer />
    </Container>
  </ThemeProvider>
)

export default App
