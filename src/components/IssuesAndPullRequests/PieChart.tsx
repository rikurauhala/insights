import { PieChart as MuiXPieChart } from '@mui/x-charts/PieChart'

import theme from '~/theme'
import { formatPercentage } from '~/utils'

interface PieChartProps {
  closed: number
  open: number
  units: string
  visible: boolean
}

const PieChart = ({ closed, open, units, visible }: PieChartProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  const colorOpen = theme.palette.issues.open
  const colorClosed = theme.palette.issues.closed
  const margin = 30

  const data = [
    { color: colorClosed, label: 'Closed', value: closed },
    ...(open > 0 ? [{ color: colorOpen, label: 'Open', value: open }] : []),
  ]

  const total = open + closed

  return (
    <MuiXPieChart
      margin={{ top: margin, bottom: margin, left: margin, right: margin }}
      series={[
        {
          cornerRadius: open === 0 ? 0 : 5,
          data,
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
  )
}

export default PieChart
