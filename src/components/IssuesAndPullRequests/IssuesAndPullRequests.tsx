import AdjustIcon from '@mui/icons-material/Adjust'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'

import Section from '~/components/Section'
import dataService from '~/services/data'
import { IssueOrPullRequest } from '~/types'

import Content from './Content'

const IssuesAndPullRequests = (): JSX.Element => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [issues, setIssues] = useState<IssueOrPullRequest[]>([])
  const [noIssuesData, setNoIssuesData] = useState<boolean>(true)
  const [pullRequests, setPullRequests] = useState<IssueOrPullRequest[]>([])
  const [noPullRequestsData, setNoPullRequestsData] = useState<boolean>(true)

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
        setIssues((prevIssues) => {
          const newIssues = newData.filter(
            (issueOrPullRequest) => issueOrPullRequest.type === 'issue'
          )
          if (newIssues.length > 0) {
            setNoIssuesData(false)
            setLoading(false)
          }
          return prevIssues.concat(newIssues)
        })
        setPullRequests((prevPullRequests) => {
          const newPullRequests = newData.filter(
            (issueOrPullRequest) => issueOrPullRequest.type === 'pullRequest'
          )
          if (newPullRequests.length > 0) {
            setNoPullRequestsData(false)
            setLoading(false)
          }
          return prevPullRequests.concat(newPullRequests)
        })
      }
      setFetching(false)
    }

    void fetchData()
  }, [])

  return (
    <Section
      description="Opened and closed issues and pull requests"
      fetching={fetching}
      icon={<AdjustIcon />}
      info="The pie charts display the share of opened and closed issues and pull requests."
      title="Issues and PRs"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Content
          closed={issues.filter((issue) => issue.state === 'closed').length}
          loading={loading}
          noData={noIssuesData}
          open={issues.filter((issue) => issue.state === 'open').length}
          units="issues"
        />
        <Content
          closed={pullRequests.filter((pr) => pr.state === 'closed').length}
          loading={loading}
          noData={noPullRequestsData}
          open={pullRequests.filter((pr) => pr.state === 'open').length}
          units="pull requests"
        />
      </Stack>
    </Section>
  )
}

export default IssuesAndPullRequests
