import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Issues from '~/components/Issues'
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
    key: 'issues',
    title: 'Issues',
    description: 'Issues opened by you',
    info: 'To be written.',
    component: <Issues />,
  },
  {
    key: 'languages',
    title: 'Languages',
    description: 'Top programming languages',
    info: (
      <span>
        <b>Repository</b> displays the share of each language used as the main (majority) language
        of a repository.
        <br />
        <br />
        <b>Total bytes</b> shows the proportion of each language used across all repositories by the
        total number of bytes. Note that some languages may have a higher share due to the size of
        the files.
        <br />
        <br />
        Hover over the pie chart to see the exact number and share of each item.
      </span>
    ),
    component: <Languages />,
  },
  {
    key: 'topics',
    title: 'Topics',
    description: 'Top repository topics',
    info: 'Use the slider to control the number of topics shown.',
    component: <Topics />,
  },
]

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">
      {content.map(({ key, component, ...props }) => (
        <Section key={key} {...props}>
          {component}
        </Section>
      ))}
      <Footer />
    </Container>
  </ThemeProvider>
)

export default App
