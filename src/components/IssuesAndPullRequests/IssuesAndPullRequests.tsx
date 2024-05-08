import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { IssueOrPullRequest } from '~/types'

import Content from './Content'

const IssuesAndPullRequests = (): JSX.Element => {
  const [issues, setIssues] = useState<IssueOrPullRequest[]>([])
  const [pullRequests, setPullRequests] = useState<IssueOrPullRequest[]>([])

  useEffect(() => {
    const fetchData = async () => {
      let page = 1
      let fetching = true
      while (fetching) {
        const newData = await dataService.getIssuesAndPullRequests(page)
        page++
        if (newData.length === 0) {
          fetching = false
          break
        }
        setIssues((prevIssues) =>
          prevIssues.concat(
            newData.filter((issueOrPullRequest) => issueOrPullRequest.type === 'issue')
          )
        )
        setPullRequests((prevPullRequests) =>
          prevPullRequests.concat(
            newData.filter((issueOrPullRequest) => issueOrPullRequest.type === 'pullRequest')
          )
        )
      }
    }

    void fetchData()
  }, [])

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Content
        closed={issues.filter((issue) => issue.state === 'closed').length}
        loading={issues.length === 0}
        open={issues.filter((issue) => issue.state === 'open').length}
        units="issues"
      />
      <Content
        closed={pullRequests.filter((pr) => pr.state === 'closed').length}
        loading={issues.length === 0}
        open={pullRequests.filter((pr) => pr.state === 'open').length}
        units="pull requests"
      />
    </Stack>
  )
}

export default IssuesAndPullRequests
