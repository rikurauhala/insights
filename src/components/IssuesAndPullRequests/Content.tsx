import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import { PieChart } from '@mui/x-charts/PieChart'

import { formatPercentage } from '~/utils'

import Loading from './Loading'

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

  const margin = 30

  const total = open + closed

  const data = [
    { color: colorClosed, label: 'Closed', value: closed },
    ...(open > 0 ? [{ color: colorOpen, label: 'Open', value: open }] : []),
  ]

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
          {loading ? (
            <Loading />
          ) : (
            <PieChart
              margin={{ top: margin, bottom: margin, left: margin, right: margin }}
              series={[
                {
                  cornerRadius: open === 0 ? 0 : 5,
                  data: data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  innerRadius: 50,
                  paddingAngle: open === 0 ? 0 : 3,
                  valueFormatter: ({ value }) => formatPercentage(total, units, value),
                },
              ]}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          )}
        </Paper>
      </Box>
    </Stack>
  )
}

export default Content
