import { Octokit } from 'octokit'

import { TOKEN } from '@/config'
import { RepositoryFull, UserFull } from '@/types'

const username = 'rikurauhala'
const octokit = new Octokit({ auth: TOKEN })

const getLanguages = (languagesUrl: string, setState: (arg0: string[]) => void) => {
  const fetchLanguages = async () => {
    try {
      const octokit = new Octokit()
      const response = await octokit.request(`GET ${languagesUrl}`)
      setState(response.data as Array<string>)
    } catch (error) {
      console.error(error)
    }
  }
  void fetchLanguages()
}

const getRepositories = (setState: (arg0: RepositoryFull[]) => void) => {
  const fetchRepositories = async () => {
    try {
      const response = await octokit.request(`GET /users/${username}/repos`)
      setState(response.data as Array<RepositoryFull>)
    } catch (error) {
      console.error(error)
    }
  }
  void fetchRepositories()
}

const getUser = (setState: (arg0: UserFull) => void) => {
  const fetchUser = async () => {
    try {
      const response = await octokit.request(`GET /users/${username}`)
      setState(response.data as UserFull)
    } catch (error) {
      console.error(error)
    }
  }
  void fetchUser()
}

export default { getLanguages, getRepositories, getUser }
