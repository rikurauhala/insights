import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { Commit } from '~/types'

const Commits = (): JSX.Element => {
  const [commits, setCommits] = useState<Commit[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    const page = 1
    void dataService.getCommits(page).then((data) => {
      setCommits(data)
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let page = 1
      let fetching = true
      while (fetching) {
        const newCommits = await dataService.getCommits(page)
        page++
        if (newCommits.length === 0) {
          fetching = false
          break
        }
        setCommits((prevCommits) => {
          return prevCommits.concat(newCommits)
        })
      }
    }

    void fetchData()
    setLoading(false)
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

  const earliestDate = new Date(
    Math.min(...Object.keys(commitCountsByMonth).map((key) => new Date(key).getTime()))
  )
  const latestDate = new Date(
    Math.max(...Object.keys(commitCountsByMonth).map((key) => new Date(key).getTime()))
  )

  const monthsWithZeroCommits: Record<string, number> = {}
  const currentDate = new Date(earliestDate)
  while (currentDate <= latestDate) {
    const monthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      '0'
    )}`
    if (!(monthYear in commitCountsByMonth)) {
      monthsWithZeroCommits[monthYear] = 0
    }
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  const mergedCommitCounts = { ...monthsWithZeroCommits, ...commitCountsByMonth }

  const sortedData = Object.entries(mergedCommitCounts)
    .map(([monthYear, count]) => ({ date: new Date(monthYear), count }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const xAxisData = sortedData.map(({ date }) => date)
  const seriesData = sortedData.map(({ count }) => count)

  const uniqueYears = Array.from(new Set(xAxisData.map((date) => date.getFullYear())))

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'numeric', year: 'numeric' })
  }

  return (
    <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px', padding: '15px' }}>
      <LineChart
        grid={{ horizontal: true, vertical: true }}
        series={[{ color: theme.palette.commits.main, data: seriesData }]}
        xAxis={[
          {
            data: xAxisData,
            label: 'Month',
            scaleType: 'time',
            tickInterval: uniqueYears.map((year) => new Date(`${year}-01-01`)),
            valueFormatter: (date) => formatDate(date),
          },
        ]}
        yAxis={[{ label: 'Commits', min: 0, tickMinStep: 1 }]}
      />
    </Paper>
  )
}

export default Commits
