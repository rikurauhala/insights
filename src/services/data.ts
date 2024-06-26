import sessionStorage from '~/repositories/sessionStorage'
import octokitService from '~/services/octokit'
import {
  Commit,
  GitHubUser,
  IssueOrPullRequest,
  LanguageMap,
  RepositoryFromAPI,
  TopicMap,
  UserFromAPI,
} from '~/types'

const getCommits = async (
  username: string,
  start: string,
  end: string,
  page: number
): Promise<Commit[]> => {
  const storageKey = 'commits'
  let storedData = sessionStorage.read(storageKey) as Record<string, Record<number, Commit[]>>

  const dateRange = `${start}-${end}`

  if (!storedData) {
    storedData = {}
  }

  if (!storedData[dateRange]) {
    storedData[dateRange] = {}
  }

  if (storedData[dateRange][page]) {
    return storedData[dateRange][page] as Commit[]
  }

  const data = await octokitService.fetchCommits(username, start, end, page)

  const commits: Commit[] = []
  data.forEach((commit) => {
    commits.push({
      date: commit.commit.author.date,
      sha: commit.sha,
    })
  })

  storedData[dateRange][page] = commits
  sessionStorage.write(storageKey, storedData)

  return commits
}

const getIssuesAndPullRequests = async (page: number): Promise<IssueOrPullRequest[]> => {
  const storageKey = 'issuesAndPullRequests'
  const storedData = sessionStorage.read(storageKey) as Record<number, IssueOrPullRequest[]>
  if (storedData && storedData[page]) {
    return storedData[page] as IssueOrPullRequest[]
  }

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

  sessionStorage.write(storageKey, {
    ...storedData,
    [page]: issuesAndPullRequests,
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
  if (repositories == undefined) {
    return {}
  }
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
  if (repositories == undefined) {
    return {}
  }
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

const getRepositories = async (): Promise<RepositoryFromAPI[]> => {
  const storageKey = 'repositories'
  const repositories = sessionStorage.read(storageKey)
  if (repositories) {
    return repositories as RepositoryFromAPI[]
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

  const userData: UserFromAPI = await octokitService.fetchUser()
  if (userData == undefined) {
    return {
      avatarUrl: '',
      location: 'Unknown',
      name: 'Unknown',
      profileUrl: '',
      registrationDate: '',
      username: 'Unknown',
    }
  }
  const user: GitHubUser = {
    avatarUrl: userData.avatar_url,
    location: userData.location || 'Unknown',
    name: userData.name || userData.login,
    profileUrl: userData.html_url,
    registrationDate: userData.created_at,
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
  if (repositories == undefined) {
    return {}
  }

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
  getCommits,
  getIssuesAndPullRequests,
  getLanguagesByRepo,
  getLanguagesBySize,
  getTopics,
  getUser,
}
