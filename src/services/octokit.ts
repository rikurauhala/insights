import { Octokit } from 'octokit'

import { TOKEN } from '~/config'
import { RepositoryFull, UserFull } from '~/types'

const octokit = new Octokit({ auth: TOKEN })

const getLanguages = (languagesUrl: string, setState: (arg0: string[]) => void): void => {
  const languages = sessionStorage.getItem(`languages${languagesUrl}`)
  if (languages) {
    setState(JSON.parse(languages) as string[])
    return
  }

  const fetchLanguages = async () => {
    try {
      const response = await octokit.request(`GET ${languagesUrl}`)
      setState(response.data as Array<string>)
      sessionStorage.setItem(`languages${languagesUrl}`, JSON.stringify(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  void fetchLanguages()
}

const getRepositories = (setState: (arg0: RepositoryFull[]) => void): void => {
  const repositories = sessionStorage.getItem('repositories')
  if (repositories) {
    setState(JSON.parse(repositories) as RepositoryFull[])
    return
  }

  const fetchRepositories = async () => {
    try {
      const response = await octokit.request('GET /user/repos', {
        affiliation: 'owner,collaborator',
        per_page: 100,
      })
      setState(response.data as Array<RepositoryFull>)
      sessionStorage.setItem('repositories', JSON.stringify(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  void fetchRepositories()
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

export default { getLanguages, getRepositories, getUser }
