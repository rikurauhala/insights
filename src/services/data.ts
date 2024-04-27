import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import {
  GitHubUser,
  IssueOrPullRequest,
  LanguageMap,
  RepositoryFull,
  TopicMap,
  UserFull,
} from '~/types'
import { formatTimestamp } from '~/utils'

const getIssuesAndPullRequests = async (page: number): Promise<IssueOrPullRequest[]> => {
  const data = await octokitService.fetchIssuesAndPullRequests(page)

  const issuesAndPullRequests: IssueOrPullRequest[] = []
  data.forEach((issueOrPullRequest) => {
    const contribution: IssueOrPullRequest = {
      closedAt: issueOrPullRequest.closed_at,
      createdAt: issueOrPullRequest.created_at,
      state: issueOrPullRequest.state,
      type: issueOrPullRequest.pull_request ? 'pullRequest' : 'issue',
    }
    issuesAndPullRequests.push(contribution)
  })

  return issuesAndPullRequests
}

const getLanguagesBySize = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesBySize'
  const languagesBySize = sessionStorage.read(storageKey)
  if (languagesBySize) {
    return languagesBySize as LanguageMap
  }

  const repositories = await getRepositories()
  const languages = await octokitService.fetchLanguages(repositories)

  const limitedLanguages = sortAndLimitLanguages(languages, 10)
  sessionStorage.write(storageKey, limitedLanguages)
  return limitedLanguages
}

const getLanguagesByRepo = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesByRepo'
  const languagesByRepo = sessionStorage.read(storageKey)
  if (languagesByRepo) {
    return languagesByRepo as LanguageMap
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

  const limitedLanguages = sortAndLimitLanguages(languageMap, 10)
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

  const sortedAndLimitedLanguages = Object.fromEntries(
    Object.entries(limitedLanguages).sort(([, a], [, b]) => b - a)
  )

  return sortedAndLimitedLanguages
}

const sortTopics = (topicsMap: TopicMap): TopicMap => {
  return Object.fromEntries(Object.entries(topicsMap).sort(([, a], [, b]) => b - a))
}

export default {
  getIssuesAndPullRequests,
  getLanguagesBySize,
  getLanguagesByRepo,
  getRepositories,
  getTopics,
  getUser,
}
