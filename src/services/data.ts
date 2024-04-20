import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import {
  GitHubUser,
  IssueOrPullRequest,
  IssueOrPullRequestFromAPI,
  LanguageMap,
  RepositoryFull,
  TopicMap,
  UserFull,
} from '~/types'
import { formatTimestamp } from '~/utils'

const getIssues = async (): Promise<IssueOrPullRequest[]> => {
  const storageKey = 'issues'
  const issues = sessionStorage.read(storageKey)
  if (issues) {
    return issues as IssueOrPullRequest[]
  }

  const contributions: IssueOrPullRequest[] = await getIssuesAndPullRequests()
  const issuesOnly = contributions.filter((contribution) => contribution.type === 'issue')
  sessionStorage.write(storageKey, issuesOnly)
  return issuesOnly
}

const getIssuesAndPullRequests = async (): Promise<IssueOrPullRequest[]> => {
  const storageKey = 'issuesAndPullRequests'
  const issuesAndPullRequests = sessionStorage.read(storageKey)
  if (issuesAndPullRequests) {
    return issuesAndPullRequests as IssueOrPullRequest[]
  }

  const data: IssueOrPullRequestFromAPI[] = await octokitService.fetchIssuesAndPullRequests()
  const contributions: IssueOrPullRequest[] = []
  data.forEach((issueOrPullRequest) => {
    const contribution: IssueOrPullRequest = {
      closedAt: issueOrPullRequest.closed_at,
      createdAt: issueOrPullRequest.created_at,
      state: issueOrPullRequest.state,
      type: issueOrPullRequest.pull_request ? 'pullRequest' : 'issue',
    }
    contributions.push(contribution)
  })
  sessionStorage.write(storageKey, contributions)
  return contributions
}

const getLanguagesByBytes = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesByBytes'
  const languagesByBytes = sessionStorage.read(storageKey)
  if (languagesByBytes) {
    return languagesByBytes as LanguageMap
  }

  const repositories = await getRepositories()
  const languages = await octokitService.fetchLanguages(repositories)

  const limitedLanguages = sortAndLimitLanguages(languages, 5)
  sessionStorage.write(storageKey, limitedLanguages)
  return limitedLanguages
}

const getLanguagesByRepository = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesByRepository'
  const languagesByRepository = sessionStorage.read(storageKey)
  if (languagesByRepository) {
    return languagesByRepository as LanguageMap
  }

  const repositories = await getRepositories()
  const languageMap: LanguageMap = {}
  repositories.forEach(({ language }) => {
    if (!language) {
      return
    }
    const count = languageMap[language] || 0
    languageMap[language] = count + 1
  })

  const limitedLanguages = sortAndLimitLanguages(languageMap, 5)
  sessionStorage.write(storageKey, limitedLanguages)
  return limitedLanguages
}

const getRepositories = async (): Promise<RepositoryFull[]> => {
  const storageKey = 'repositories'
  const repositories = sessionStorage.read(storageKey)
  if (repositories) {
    return repositories as RepositoryFull[]
  }

  const repositoriesData = await octokitService.fetchRepositories()
  sessionStorage.write(storageKey, repositoriesData)
  return repositoriesData
}

const getUser = async (): Promise<GitHubUser> => {
  const storageKey = 'gitHubUser'
  const gitHubUser = sessionStorage.read(storageKey)
  if (gitHubUser) {
    return gitHubUser as GitHubUser
  }

  const userData: UserFull = await octokitService.fetchUser()
  const user: GitHubUser = {
    avatarUrl: userData.avatar_url,
    location: userData.location || 'Unknown',
    name: userData.name || userData.login,
    profileUrl: userData.html_url,
    registrationDate: formatTimestamp(userData.created_at),
    username: userData.login,
  }
  sessionStorage.write(storageKey, user)
  return user
}

const getTopics = async (): Promise<TopicMap> => {
  const storageKey = 'topics'
  const topics = sessionStorage.read(storageKey)
  if (topics) {
    return topics as TopicMap
  }

  const repositories = await getRepositories()
  const topicMap: TopicMap = {}
  repositories.forEach(({ topics }) => {
    topics.forEach((topic) => {
      const count = topicMap[topic] || 0
      topicMap[topic] = count + 1
    })
  })

  const sortedTopics = sortTopics(topicMap)
  sessionStorage.write(storageKey, sortedTopics)
  return sortedTopics
}

const sortAndLimitLanguages = (languagesData: LanguageMap, limit: number): LanguageMap => {
  const sortedLanguages = Object.fromEntries(
    Object.entries(languagesData).sort(([, a], [, b]) => b - a)
  )

  const topLanguages = Object.fromEntries(Object.entries(sortedLanguages).slice(0, limit))
  const totalItems = Object.values(languagesData).reduce((total, items) => total + items, 0)
  const topLanguagesItems = Object.values(topLanguages).reduce((total, items) => total + items, 0)
  const otherItems = totalItems - topLanguagesItems

  const limitedLanguages = {
    ...topLanguages,
    Other: otherItems,
  }

  return limitedLanguages
}

const sortTopics = (topicsMap: TopicMap): TopicMap => {
  return Object.fromEntries(Object.entries(topicsMap).sort(([, a], [, b]) => b - a))
}

export default {
  getLanguagesByBytes,
  getLanguagesByRepository,
  getIssues,
  getRepositories,
  getTopics,
  getUser,
}
