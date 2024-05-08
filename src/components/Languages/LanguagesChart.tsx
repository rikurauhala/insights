import { BarSeriesType } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'

interface LanguagesChartProps {
  data: string[]
  formatAxisValue: (value: string) => string
  label: string
  series: BarSeriesType[]
  visible: boolean
}

const LanguagesChart = ({
  data,
  formatAxisValue,
  label,
  series,
  visible,
}: LanguagesChartProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <BarChart
      grid={{ vertical: true }}
      layout="horizontal"
      margin={{ bottom: 80, left: 90 }}
      series={series}
      slotProps={{ legend: { hidden: true } }}
      xAxis={[
        {
          label,
          tickMinStep: 1,
          valueFormatter: (value) => formatAxisValue(value),
        },
      ]}
      yAxis={[
        {
          data,
          hideTooltip: true,
          scaleType: 'band',
        },
      ]}
    />
  )
}

export default LanguagesChart
