import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { Commit } from '~/types'

const Commits = (): JSX.Element => {
  const [commits, setCommits] = useState<Commit[]>([])
  const theme = useTheme()

  useEffect(() => {
    const page = 1
    void dataService.getCommits(page).then((data) => {
      setCommits(data)
    })
  }, [])

  const commitCountsByMonth = commits.reduce((counts, commit) => {
    const commitDate = new Date(commit.date)
    const monthYear = `${commitDate.getFullYear()}-${String(commitDate.getMonth() + 1).padStart(
      2,
      '0'
    )}`
    counts[monthYear] = (counts[monthYear] || 0) + 1
    return counts
  }, {} as Record<string, number>)

  const xAxisData = Object.keys(commitCountsByMonth).map((monthYear) => new Date(monthYear))
  const seriesData = Object.values(commitCountsByMonth)

  return (
    <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px', padding: '15px' }}>
      <LineChart
        grid={{ horizontal: true }}
        series={[{ color: theme.palette.commits.main, data: seriesData }]}
        xAxis={[
          {
            data: xAxisData,
            label: 'Month',
            scaleType: 'time',
            valueFormatter: (date) =>
              new Date(date).toLocaleDateString('en-US', { month: 'numeric', year: 'numeric' }),
          },
        ]}
        yAxis={[{ label: 'Commits' }]}
      />
    </Paper>
  )
}

export default Commits
