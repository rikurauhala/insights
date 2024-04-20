import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    issues: {
      open: string
      closed: string
    }
  }
  interface PaletteOptions {
    issues?: {
      open?: string
      closed?: string
    }
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4493f8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#848d97',
    },
    background: {
      default: '#010409',
      paper: '#0d1117',
    },
    issues: {
      open: '#3fb950',
      closed: '#a371f7',
    },
  },
})

export default theme
