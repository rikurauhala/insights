import CommitIcon from '@mui/icons-material/Commit'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'

import OptionSelector from '~/components/OptionSelector'
import Section from '~/components/Section'
import dataService from '~/services/data'
import { Commit, CommitsMode } from '~/types'

import CommitsChart from './CommitsChart'
import Loading from './Loading'
import NoData from './NoData'

const getMonthYear = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

const getCommitCountsByMonth = (commits: Commit[]): Record<string, number> => {
  return commits.reduce(
    (counts, commit) => {
      const commitDate = new Date(commit.date)
      const monthYear = getMonthYear(commitDate)
      counts[monthYear] = (counts[monthYear] || 0) + 1
      return counts
    },
    {} as Record<string, number>
  )
}

const getCommitCountsByYear = (commits: Commit[]): Record<string, number> => {
  return commits.reduce(
    (counts, commit) => {
      const commitDate = new Date(commit.date)
      const year = commitDate.getFullYear().toString()
      counts[year] = (counts[year] || 0) + 1
      return counts
    },
    {} as Record<string, number>
  )
}

const Commits = (): JSX.Element => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [commits, setCommits] = useState<Commit[]>([])
  const [noData, setNoData] = useState<boolean>(true)
  const [mode, setMode] = useState<CommitsMode>(CommitsMode.MONTH)

  useEffect(() => {
    const fetchData = async () => {
      const user = await dataService.getUser()
      const username = user.username || ''

      const currentDate = new Date()
      const registrationDate = new Date(user.registrationDate || currentDate)
      registrationDate.setMonth(registrationDate.getMonth() - 1)

      while (currentDate >= registrationDate) {
        let page = 1
        while (true) {
          const year = currentDate.getFullYear()
          const month = String(currentDate.getMonth() + 1).padStart(2, '0')
          const start = `${year}-${month}-01`
          const endDate = new Date(year, currentDate.getMonth() + 1, 0).getDate()
          const end = `${year}-${month}-${endDate}`

          const newCommits = await dataService.getCommits(username, start, end, page)
          if (newCommits.length === 0) {
            break
          }
          setCommits((prevCommits) => prevCommits.concat(newCommits))
          setNoData(Object.keys(newCommits).length === 0)
          setLoading(false)
          page++
        }
        currentDate.setMonth(currentDate.getMonth() - 1)
      }
      setFetching(false)
    }

    void fetchData()
  }, [])

  const formatDate = (date: Date) => {
    if (mode === CommitsMode.MONTH) {
      return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })
    }
    return date.toLocaleDateString('en-US', { year: 'numeric' })
  }

  const getLabel = () => {
    return mode === CommitsMode.MONTH ? ' \nMonth' : ' \nYear'
  }

  const commitCountsByPeriod =
    mode === CommitsMode.MONTH ? getCommitCountsByMonth(commits) : getCommitCountsByYear(commits)

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
      mode === CommitsMode.MONTH ? getMonthYear(currentDate) : currentDate.getFullYear().toString()
    if (!(period in commitCountsByPeriod)) {
      periodsWithZeroCommits[period] = 0
    }
    currentDate.setMonth(currentDate.getMonth() + (mode === CommitsMode.MONTH ? 12 : 1))
  }

  const mergedCommitCounts = { ...periodsWithZeroCommits, ...commitCountsByPeriod }

  const sortedData = Object.entries(mergedCommitCounts)
    .map(([period, count]) => ({ date: new Date(period), count }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const xAxisData = sortedData.map(({ date }) => date)
  const seriesData = sortedData.map(({ count }) => count)

  const handleModeChange = (newMode: string) => {
    setMode(newMode as CommitsMode)
  }

  return (
    <Section
      description="Commits over time"
      fetching={fetching}
      icon={<CommitIcon />}
      info={
        <span>
          <p>The chart displays commits made by you over time.</p>
          <p>It may take a while for the data to be fetched.</p>
        </span>
      }
      title="Commits"
    >
      <Box>
        <OptionSelector
          disabled={loading || noData}
          onChange={handleModeChange}
          options={[
            { label: 'Month', value: CommitsMode.MONTH },
            { label: 'Year', value: CommitsMode.YEAR },
          ]}
          value={mode}
        />
        <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px', padding: '15px' }}>
          <Loading visible={loading} />
          <NoData visible={!loading && noData} />
          <CommitsChart
            formatDate={formatDate}
            label={getLabel()}
            mode={mode}
            seriesData={seriesData}
            visible={!loading && !noData}
            xAxisData={xAxisData}
          />
        </Paper>
      </Box>
    </Section>
  )
}

export default Commits
