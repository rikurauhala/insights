import { Octokit } from 'octokit'

import { TOKEN } from '~/config'
import { IssueOrPullRequestFromAPI, LanguageMap, RepositoryFull, UserFull } from '~/types'

const octokit = new Octokit({ auth: TOKEN })

const fetchLanguages = (repositories: RepositoryFull[]): Promise<LanguageMap> => {
  const languagePromises = repositories.map((repository) =>
    octokit.request(`GET ${repository.languages_url}`).then((response) => response.data)
  )

  return Promise.all(languagePromises).then((languagesArray) => {
    const languages: LanguageMap = {}
    languagesArray.forEach((repoLanguages) => {
      for (const language in repoLanguages) {
        const count = languages[language] || 0
        languages[language] = count + repoLanguages[language]
      }
    })
    return languages
  })
}

const fetchIssuesAndPullRequests = async (): Promise<IssueOrPullRequestFromAPI[]> => {
  const {
    data: { login: username },
  } = await octokit.rest.users.getAuthenticated()
  return new Promise((resolve, reject) => {
    octokit
      .paginate('GET /search/issues', {
        q: `author:${username}`,
        per_page: 100,
      })
      .then((response) => {
        console.log(response)
        resolve(response as IssueOrPullRequestFromAPI[])
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
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
  fetchLanguages,
  fetchIssuesAndPullRequests,
  fetchRepositories,
  fetchUser,
}
