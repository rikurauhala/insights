import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import Loading from './Loading'
import PieChart from './PieChart'

interface ContentProps {
  closed: number
  loading: boolean
  open: number
  units: string
}

const Content = ({ closed, loading, open, units }: ContentProps): JSX.Element => {
  const theme = useTheme()
  const colorOpen = theme.palette.issues.open
  const colorClosed = theme.palette.issues.closed

  const total = open + closed

  return (
    <Stack direction="column" justifyContent="space-between" spacing={1}>
      <Box>
        <Typography
          component="h3"
          sx={{ fontWeight: 'medium', marginTop: '10px', textTransform: 'capitalize' }}
          variant="subtitle1"
        >
          {units}
        </Typography>
        <Typography component="p" margin="10px 0px" variant="body2">
          You have opened a total of <b>{total}</b> {units} of which {closed} have been{' '}
          <Typography color={colorClosed} component="span" variant="inherit">
            closed
          </Typography>{' '}
          and {open} are still{' '}
          <Typography color={colorOpen} component="span" variant="inherit">
            open
          </Typography>
          !
        </Typography>
      </Box>
      <Box>
        <Paper
          elevation={3}
          sx={{
            height: '300px',
            padding: '20px',
            width: '100%',
          }}
        >
          <Loading visible={loading} />
          <PieChart closed={closed} open={open} units={units} visible={!loading} />
        </Paper>
      </Box>
    </Stack>
  )
}

export default Content
