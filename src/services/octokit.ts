import { Octokit } from 'octokit'

import { TOKEN } from '~/config'
import { LanguageMap, RepositoryFull, UserFull } from '~/types'

const octokit = new Octokit({ auth: TOKEN })

const getLanguages = (repositories: RepositoryFull[]): Promise<LanguageMap> => {
  const languages = sessionStorage.getItem('languages')
  if (languages) {
    return Promise.resolve(JSON.parse(languages) as LanguageMap)
  }

  const languagePromises = repositories.map((repository) =>
    octokit.request(`GET ${repository.languages_url}`).then((response) => response.data)
  )

  return Promise.all(languagePromises).then((languagesArray) => {
    const languages: LanguageMap = {}

    languagesArray.forEach((repoLanguages) => {
      for (const language in repoLanguages) {
        if (languages[language]) {
          languages[language] += repoLanguages[language]
        } else {
          languages[language] = repoLanguages[language]
        }
      }
    })

    const sortedLanguages = Object.fromEntries(
      Object.entries(languages).sort(([, a], [, b]) => b - a)
    )

    const topLanguages = Object.fromEntries(Object.entries(sortedLanguages).slice(0, 5))

    const totalBytes = Object.values(languages).reduce((total, bytes) => total + bytes, 0)
    const topLanguagesBytes = Object.values(topLanguages).reduce((total, bytes) => total + bytes, 0)
    const otherBytes = totalBytes - topLanguagesBytes

    const limitedLanguages = {
      ...topLanguages,
      Other: otherBytes,
    }

    sessionStorage.setItem('languages', JSON.stringify(limitedLanguages))

    return limitedLanguages
  })
}

const getRepositories = (): Promise<RepositoryFull[]> => {
  return new Promise((resolve, reject) => {
    const repositories = sessionStorage.getItem('repositories')
    if (repositories) {
      resolve(JSON.parse(repositories) as RepositoryFull[])
    } else {
      octokit
        .request('GET /user/repos', {
          affiliation: 'owner',
          per_page: 100,
        })
        .then((response) => {
          const repositoriesData = response.data as RepositoryFull[]
          sessionStorage.setItem('repositories', JSON.stringify(repositoriesData))
          resolve(repositoriesData)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    }
  })
}

const getUser = (): Promise<UserFull> => {
  return new Promise((resolve, reject) => {
    const gitHubUser = sessionStorage.getItem('gitHubUser')
    if (gitHubUser) {
      resolve(JSON.parse(gitHubUser) as UserFull)
    } else {
      octokit
        .request('GET /user')
        .then((response) => {
          const userData = response.data as UserFull
          sessionStorage.setItem('gitHubUser', JSON.stringify(userData))
          resolve(userData)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    }
  })
}

export default {
  getLanguages,
  getRepositories,
  getUser,
}
