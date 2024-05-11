import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { Commit } from '~/types'

import CommitsChart from './CommitsChart'
import Loading from './Loading'
import NoData from './NoData'

enum Mode {
  MONTH = 'month',
  YEAR = 'year',
}

const getCommitCountsByMonth = (commits: Commit[]): Record<string, number> => {
  return commits.reduce((counts, commit) => {
    const commitDate = new Date(commit.date)
    const monthYear = `${commitDate.getFullYear()}-${String(commitDate.getMonth() + 1).padStart(
      2,
      '0'
    )}`
    counts[monthYear] = (counts[monthYear] || 0) + 1
    return counts
  }, {} as Record<string, number>)
}

const getCommitCountsByYear = (commits: Commit[]): Record<string, number> => {
  return commits.reduce((counts, commit) => {
    const commitDate = new Date(commit.date)
    const year = commitDate.getFullYear().toString()
    counts[year] = (counts[year] || 0) + 1
    return counts
  }, {} as Record<string, number>)
}

const Commits = (): JSX.Element => {
  const [commits, setCommits] = useState<Commit[]>([])
  const [mode, setMode] = useState<Mode>(Mode.MONTH)
  const [loading, setLoading] = useState<boolean>(true)
  const [noData, setNoData] = useState<boolean>(true)

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
          setNoData(Object.keys(newCommits).length === 0)
          page++
        }
        currentDate.setMonth(currentDate.getMonth() - 1)
      }
    }

    void fetchData()
    setLoading(false)
  }, [])

  const formatDate = (date: Date) => {
    if (mode === Mode.MONTH) {
      return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
    }
    return date.toLocaleDateString('en-US', { year: 'numeric' })
  }

  const getLabel = () => {
    return mode === Mode.MONTH ? ' \nMonth' : ' \nYear'
  }

  const commitCountsByPeriod =
    mode === Mode.MONTH ? getCommitCountsByMonth(commits) : getCommitCountsByYear(commits)

  const earliestDate = new Date(
    Math.min(...Object.keys(commitCountsByPeriod).map((key) => new Date(key).getTime()))
  )
  const latestDate = new Date(
    Math.max(...Object.keys(commitCountsByPeriod).map((key) => new Date(key).getTime()))
  )

  const periodsWithZeroCommits: Record<string, number> = {}
  const currentDate = new Date(earliestDate)
  while (currentDate <= latestDate) {
    const period =
      mode === Mode.MONTH
        ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
        : currentDate.getFullYear().toString()
    if (!(period in commitCountsByPeriod)) {
      periodsWithZeroCommits[period] = 0
    }
    currentDate.setMonth(currentDate.getMonth() + (mode === Mode.MONTH ? 12 : 1))
  }

  const mergedCommitCounts = { ...periodsWithZeroCommits, ...commitCountsByPeriod }

  const sortedData = Object.entries(mergedCommitCounts)
    .map(([period, count]) => ({ date: new Date(period), count }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const xAxisData = sortedData.map(({ date }) => date)
  const seriesData = sortedData.map(({ count }) => count)

  return (
    <Box>
      <FormControl>
        <RadioGroup onChange={(event) => setMode(event.target.value as Mode)} row value={mode}>
          <FormControlLabel
            control={<Radio />}
            disabled={loading || noData}
            label="Month"
            value={Mode.MONTH}
          />
          <FormControlLabel
            control={<Radio />}
            disabled={loading || noData}
            label="Year"
            value={Mode.YEAR}
          />
        </RadioGroup>
      </FormControl>
      <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px', padding: '15px' }}>
        <Loading visible={loading} />
        <NoData visible={!loading && noData} />
        <CommitsChart
          formatDate={formatDate}
          label={getLabel()}
          seriesData={seriesData}
          visible={!loading && !noData}
          xAxisData={xAxisData}
        />
      </Paper>
    </Box>
  )
}

export default Commits
