import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts'

import { CommitsMode } from '~/types'

interface CommitChartProps {
  formatDate: (date: Date) => string
  label: string
  mode: string
  seriesData: number[]
  visible: boolean
  xAxisData: Date[]
}

const CommitChart = ({
  formatDate,
  label,
  mode,
  seriesData,
  visible,
  xAxisData,
}: CommitChartProps): JSX.Element => {
  const theme = useTheme()

  if (!visible) {
    return <></>
  }

  const uniqueYears = Array.from(new Set(xAxisData.map((date) => date.getFullYear())))

  if (uniqueYears.length > 0 && mode === CommitsMode.MONTH) {
    uniqueYears.shift()
  }

  return (
    <LineChart
      grid={{ horizontal: true, vertical: true }}
      margin={{ left: 65, bottom: 70 }}
      series={[
        {
          color: theme.palette.commits.main,
          data: seriesData,
          valueFormatter: (value) => `${value} commits`,
        },
      ]}
      xAxis={[
        {
          data: xAxisData,
          label: label,
          scaleType: 'time',
          tickInterval: uniqueYears.map((year) => new Date(`${year}-01-01`)),
          valueFormatter: (date) => formatDate(date),
        },
      ]}
      yAxis={[{ label: 'Commits\n', min: 0, tickMinStep: 1 }]}
    />
  )
}

export default CommitChart
