import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { PieChart } from '@mui/x-charts/PieChart'
import dataService from '~/services/data'
import { IssueOrPullRequest } from '~/types'

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
    { color: '#3fb950', label: 'Open', value: openIssues },
    { color: '#a371f7', label: 'Closed', value: closedIssues },
  ]

  return (
    <Paper
      elevation={3}
      sx={{
        height: '390px',
        margin: '20px 0px',
        padding: '20px 0px',
        width: '100%',
      }}
    >
      <PieChart
        margin={{ top: 100, bottom: 0, left: 0, right: 0 }}
        series={[
          {
            cornerRadius: 5,
            data: data,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'row',
            itemGap: 10,
            markGap: 8,
            position: {
              horizontal: 'middle',
              vertical: 'top',
            },
          },
        }}
      />
    </Paper>
  )
}

export default Issues
