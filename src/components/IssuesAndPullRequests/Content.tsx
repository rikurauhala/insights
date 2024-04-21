import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { PieChart } from '@mui/x-charts/PieChart'

import { formatPercentage } from '~/utils'

interface ContentProps {
  closed: number
  open: number
  units: string
}

const Content = ({ closed, open, units }: ContentProps): JSX.Element => {
  const theme = useTheme()
  const colorOpen = theme.palette.issues.open
  const colorClosed = theme.palette.issues.closed

  const margin = 30

  const total = open + closed

  const data = [
    { color: colorOpen, label: 'Open', value: open },
    { color: colorClosed, label: 'Closed', value: closed },
  ]

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography component="p" margin="10px 0px" variant="body2">
          You have opened a total of <b>{total}</b> {units} of which {closed} have been{' '}
          <Typography component="span" color={colorClosed} variant="inherit">
            closed
          </Typography>{' '}
          and {open} are still{' '}
          <Typography component="span" color={colorOpen} variant="inherit">
            open
          </Typography>
          !
        </Typography>
      </Grid>
      <Grid item>
        <Paper
          elevation={3}
          sx={{
            height: '300px',
            padding: '20px',
            width: '100%',
          }}
        >
          <PieChart
            margin={{ top: margin, bottom: margin, left: margin, right: margin }}
            series={[
              {
                cornerRadius: 5,
                data: data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                innerRadius: 50,
                paddingAngle: 3,
                valueFormatter: ({ value }) => formatPercentage(total, units, value),
              },
            ]}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Content
