import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts'

interface CommitChartProps {
  seriesData: number[]
  visible: boolean
  xAxisData: Date[]
}

const CommitChart = ({ seriesData, visible, xAxisData }: CommitChartProps): JSX.Element => {
  const theme = useTheme()

  if (!visible) {
    return <></>
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
  }

  const uniqueYears = Array.from(new Set(xAxisData.map((date) => date.getFullYear())))

  if (uniqueYears.length > 0) {
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
          label: ' \nTime',
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
