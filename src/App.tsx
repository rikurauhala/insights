import AdjustIcon from '@mui/icons-material/Adjust'
import CodeIcon from '@mui/icons-material/Code'
import CommitIcon from '@mui/icons-material/Commit'
import TopicIcon from '@mui/icons-material/Topic'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Commits from '~/components/Commits'
import Footer from '~/components/Footer'
import Info from '~/components/Info'
import IssuesAndPullRequests from '~/components/IssuesAndPullRequests'
import Languages from '~/components/Languages'
import NoToken from '~/components/NoToken'
import Section from '~/components/Section'
import Topics from '~/components/Topics'

import theme from '~/theme'
import { TOKEN } from './config'

const content = [
  {
    key: 'info',
    component: <Info />,
  },
  {
    key: 'commits',
    title: 'Commits',
    description: 'Commits over time',
    icon: <CommitIcon />,
    info: 'The chart displays commits made by you over time.',
    component: <Commits />,
  },
  {
    key: 'issuesAndPullRequests',
    title: 'Issues and PRs',
    description: 'Opened and closed issues and pull requests',
    icon: <AdjustIcon />,
    info: 'The pie charts display the share of opened and closed issues and pull requests.',
    component: <IssuesAndPullRequests />,
  },
  {
    key: 'languages',
    title: 'Languages',
    description: 'Top programming languages',
    icon: <CodeIcon />,
    info: (
      <span>
        <b>Repository</b> displays the share of each language used as the main (majority) language
        of a repository.
        <br />
        <br />
        <b>Total size</b> shows the proportion of each language used across all repositories by the
        total number of megabytes.
        <br />
        <br />
        Hover over the chart to see the exact number and share of each item.
      </span>
    ),
    component: <Languages />,
  },
  {
    key: 'topics',
    title: 'Topics',
    description: 'Top repository topics',
    icon: <TopicIcon />,
    info: 'Use the slider to control the number of topics shown.',
    component: <Topics />,
  },
]

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        {!TOKEN ? (
          <NoToken />
        ) : (
          <>
            {content.map(({ key, component, ...props }) => (
              <Section key={key} {...props}>
                {component}
              </Section>
            ))}
            <Footer />
          </>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
