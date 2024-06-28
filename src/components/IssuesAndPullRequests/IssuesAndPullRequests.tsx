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
      while (true) {
        const newData = await dataService.getIssuesAndPullRequests(page)
        page++
        if (newData.length === 0) {
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

  const getClosed = (items: IssueOrPullRequest[]): number => {
    return items.filter((item) => item.state === 'closed').length
  }

  const getOpen = (items: IssueOrPullRequest[]): number => {
    return items.filter((item) => item.state === 'open').length
  }

  return (
    <Section
      description="Opened and closed issues and pull requests"
      fetching={fetching}
      icon={<AdjustIcon />}
      info={
        <span>
          <p>The pie charts display the share of opened and closed issues and pull requests.</p>
          <p>It may take a while for the data to be fetched.</p>
        </span>
      }
      title="Issues and PRs"
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Content
          closed={getClosed(issues)}
          loading={loading}
          noData={noIssuesData}
          open={getOpen(issues)}
          units="issues"
        />
        <Content
          closed={getClosed(pullRequests)}
          loading={loading}
          noData={noPullRequestsData}
          open={getOpen(pullRequests)}
          units="pull requests"
        />
      </Stack>
    </Section>
  )
}

export default IssuesAndPullRequests
