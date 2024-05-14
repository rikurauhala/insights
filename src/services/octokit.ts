import { Octokit } from 'octokit'

import { TOKEN } from '~/config'
import {
  CommitFromAPI,
  IssueOrPullRequestFromAPI,
  LanguageMap,
  RepositoryFromAPI,
  UserFromAPI,
} from '~/types'

const octokit = new Octokit({ auth: TOKEN })

const fetchCommits = async (
  username: string | null,
  start: string,
  end: string,
  page: number
): Promise<CommitFromAPI[]> => {
  try {
    const response = await octokit.request('GET /search/commits', {
      q: `author:${username} author-date:${start}..${end}`,
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

const fetchLanguages = async (repositories: RepositoryFromAPI[]): Promise<LanguageMap> => {
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

const fetchRepositories = (): Promise<RepositoryFromAPI[]> => {
  return new Promise((resolve, reject) => {
    octokit
      .request('GET /user/repos', {
        affiliation: 'owner',
        per_page: 100,
      })
      .then((response) => {
        const repositoriesData = response.data as RepositoryFromAPI[]
        resolve(repositoriesData)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const fetchUser = (): Promise<UserFromAPI> => {
  return new Promise((resolve, reject) => {
    octokit
      .request('GET /user')
      .then((response) => {
        const userData = response.data as UserFromAPI
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
