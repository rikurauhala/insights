import { CssBaseline, ThemeProvider } from '@mui/material'
import Container from '@mui/material/Container'

import Info from '@/components/Info'
import { theme } from '@/theme'

import './App.css'

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">
      <Info />
    </Container>
  </ThemeProvider>
)

export default App
