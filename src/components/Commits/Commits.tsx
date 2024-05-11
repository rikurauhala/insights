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
    const fetchData = async () => {
      const user = await dataService.getUser()
      const username = user.username || ''

      const currentDate = new Date()
      const registrationDate = new Date(user.registrationDate || currentDate)
      registrationDate.setMonth(registrationDate.getMonth() - 1)

      while (currentDate >= registrationDate) {
        let page = 1
        let fetching = true
        while (fetching) {
          const year = currentDate.getFullYear()
          const month = String(currentDate.getMonth() + 1).padStart(2, '0')
          const start = `${year}-${month}-01`
          const endDate = new Date(year, currentDate.getMonth() + 1, 0).getDate()
          const end = `${year}-${month}-${endDate}`

          const newCommits = await dataService.getCommits(username, start, end, page)
          if (newCommits.length === 0) {
            fetching = false
            break
          }
          setCommits((prevCommits) => prevCommits.concat(newCommits))
          page++
        }
        currentDate.setMonth(currentDate.getMonth() - 1)
      }
    }

    void fetchData()
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

  if (uniqueYears.length > 0) {
    uniqueYears.shift()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
  }

  return (
    <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px', padding: '15px' }}>
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
    </Paper>
  )
}

export default Commits
