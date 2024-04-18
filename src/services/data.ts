import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import { GitHubUser, LanguageMap, RepositoryFull, UserFull } from '~/types'
import { formatTimestamp } from '~/utils'

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

const getUser = async (): Promise<GitHubUser> => {
  const gitHubUser = sessionStorage.read('gitHubUser')
  if (gitHubUser) {
    console.log(gitHubUser)
    return gitHubUser as GitHubUser
  }

  const userData: UserFull = await octokitService.fetchUser()
  const user = {
    avatarUrl: userData.avatar_url,
    location: userData.location || 'Unknown',
    name: userData.name || userData.login,
    profileUrl: userData.html_url,
    registrationDate: formatTimestamp(userData.created_at),
    username: userData.login,
  }
  sessionStorage.write('gitHubUser', user)
  return user
}

export default { getLanguages, getRepositories, getUser }
