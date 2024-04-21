import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { PieChart } from '@mui/x-charts/PieChart'

import dataService from '~/services/data'
import { IssueOrPullRequest } from '~/types'
import { formatPercentage } from '~/utils'

const Issues = (): JSX.Element => {
  const [issues, setIssues] = useState<IssueOrPullRequest[]>([])
  const theme = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      let page = 1
      let fetching = true
      while (fetching) {
        const newIssues = await dataService.getIssues(page)
        page++
        if (newIssues.length === 0) {
          fetching = false
          break
        }
        setIssues((prevIssues) => prevIssues.concat(newIssues))
      }
    }

    void fetchData()
  }, [])

  if (issues.length === 0) {
    return <p>Loading issues...</p>
  }

  const openIssues = issues.filter((issue) => issue.state === 'open').length
  const closedIssues = issues.filter((issue) => issue.state === 'closed').length

  const data = [
    { color: theme.palette.issues.open, label: 'Open', value: openIssues },
    { color: theme.palette.issues.closed, label: 'Closed', value: closedIssues },
  ]

  const margin = 30

  return (
    <>
      <Box>
        <Typography component="p">
          You have opened a total of <b>{issues.length}</b> issues of which {closedIssues} have been{' '}
          <Typography component="span" color={theme.palette.issues.closed} variant="inherit">
            closed
          </Typography>{' '}
          and {openIssues} are still{' '}
          <Typography component="span" color={theme.palette.issues.open} variant="inherit">
            open
          </Typography>
          !
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          height: '300px',
          margin: '20px 0px',
          padding: '20px 0px',
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
              valueFormatter: ({ value }) => formatPercentage(issues.length, 'issues', value),
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </Paper>
    </>
  )
}

export default Issues
