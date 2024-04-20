import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { PieChart } from '@mui/x-charts/PieChart'

import dataService from '~/services/data'
import theme from '~/theme'
import { IssueOrPullRequest } from '~/types'
import { formatPercentage } from '~/utils'

const Issues = (): JSX.Element => {
  const [issues, setIssues] = useState<IssueOrPullRequest[]>([])

  useEffect(() => {
    void dataService.getIssues().then((data) => {
      setIssues(data)
    })
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
  )
}

export default Issues
