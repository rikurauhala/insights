import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import { LanguageMap, RepositoryFull, UserFull } from '~/types'

const getLanguages = async (): Promise<LanguageMap> => {
  const languages = sessionStorage.read('languages')
  if (languages) {
    return languages as LanguageMap
  }

  const repositories = await getRepositories()
  const languagesData = await octokitService.fetchLanguages(repositories)
  sessionStorage.write('languages', languagesData)
  return languagesData
}

const getRepositories = async (): Promise<RepositoryFull[]> => {
  const repositories = sessionStorage.read('repositories')
  if (repositories) {
    return repositories as RepositoryFull[]
  }

  const repositoriesData = await octokitService.fetchRepositories()
  sessionStorage.write('repositories', repositoriesData)
  return repositoriesData
}

const getUser = async (): Promise<UserFull> => {
  const gitHubUser = sessionStorage.read('gitHubUser')
  if (gitHubUser) {
    return gitHubUser as UserFull
  }

  const userData = await octokitService.fetchUser()
  sessionStorage.write('gitHubUser', userData)
  return userData
}

export default { getLanguages, getRepositories, getUser }
