import { Octokit } from 'octokit'

import { TOKEN } from '~/config'
import {
  CommitFromAPI,
  IssueOrPullRequestFromAPI,
  LanguageMap,
  RepositoryFull,
  UserFull,
} from '~/types'

const octokit = new Octokit({ auth: TOKEN })

const fetchCommits = async (page: number): Promise<CommitFromAPI[]> => {
  const {
    data: { login: username },
  } = await octokit.rest.users.getAuthenticated()
  try {
    const response = await octokit.request('GET /search/commits', {
      q: `author:${username}`,
      per_page: 100,
      page: page,
    })
    return response.data.items as CommitFromAPI[]
  } catch (error) {
    console.error(error)
    return []
  }
}

const fetchIssuesAndPullRequests = async (page: number): Promise<IssueOrPullRequestFromAPI[]> => {
  const {
    data: { login: username },
  } = await octokit.rest.users.getAuthenticated()
  try {
    const response = await octokit.request('GET /search/issues', {
      q: `author:${username}`,
      per_page: 100,
      page: page,
    })
    return response.data.items as IssueOrPullRequestFromAPI[]
  } catch (error) {
    console.error(error)
    return []
  }
}

const fetchLanguages = async (repositories: RepositoryFull[]): Promise<LanguageMap> => {
  const languagesArray = await Promise.all(
    repositories.map((repository) =>
      octokit.request(`GET ${repository.languages_url}`).then((response) => response.data)
    )
  )
  const languages: LanguageMap = {}
  languagesArray.forEach((repoLanguages) => {
    for (const language in repoLanguages) {
      const count = languages[language] || 0
      languages[language] = count + repoLanguages[language]
    }
  })
  return languages
}

const fetchRepositories = (): Promise<RepositoryFull[]> => {
  return new Promise((resolve, reject) => {
    octokit
      .request('GET /user/repos', {
        affiliation: 'owner',
        per_page: 100,
      })
      .then((response) => {
        const repositoriesData = response.data as RepositoryFull[]
        resolve(repositoriesData)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const fetchUser = (): Promise<UserFull> => {
  return new Promise((resolve, reject) => {
    octokit
      .request('GET /user')
      .then((response) => {
        const userData = response.data as UserFull
        resolve(userData)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

export default {
  fetchCommits,
  fetchIssuesAndPullRequests,
  fetchLanguages,
  fetchRepositories,
  fetchUser,
}
