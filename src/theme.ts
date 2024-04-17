import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8bb4f7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e80042',
    },
    background: {
      default: '#010409',
      paper: '#0d1117',
    },
  },
})
