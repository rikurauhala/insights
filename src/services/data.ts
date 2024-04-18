import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import { GitHubUser, LanguageMap, RepositoryFull, UserFull } from '~/types'
import { formatTimestamp } from '~/utils'

const getLanguagesByBytes = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesByBytes'
  const languages = sessionStorage.read(storageKey)
  if (languages) {
    return languages as LanguageMap
  }

  const repositories = await getRepositories()
  const languagesData = await octokitService.fetchLanguages(repositories)
  const sortedLanguages = Object.fromEntries(
    Object.entries(languagesData).sort(([, a], [, b]) => b - a)
  )

  const topLanguages = Object.fromEntries(Object.entries(sortedLanguages).slice(0, 5))

  const totalBytes = Object.values(languagesData).reduce((total, bytes) => total + bytes, 0)
  const topLanguagesBytes = Object.values(topLanguages).reduce((total, bytes) => total + bytes, 0)
  const otherBytes = totalBytes - topLanguagesBytes

  const limitedLanguages = {
    ...topLanguages,
    Other: otherBytes,
  }

  sessionStorage.write(storageKey, limitedLanguages)
  return limitedLanguages
}

const getLanguagesByRepository = async (): Promise<LanguageMap> => {
  const storageKey = 'languagesByRepository'
  const languagesByRepository = sessionStorage.read(storageKey)
  if (languagesByRepository) {
    return languagesByRepository as LanguageMap
  }

  const repositories = await getRepositories()
  const languages: LanguageMap = {}
  repositories.forEach((repository) => {
    if (!repository.language) {
      return
    }
    if (languages[repository.language]) {
      languages[repository.language]++
    } else {
      languages[repository.language] = 1
    }
  })

  const sortedLanguages = Object.fromEntries(
    Object.entries(languages).sort(([, a], [, b]) => b - a)
  )

  const topLanguages = Object.fromEntries(Object.entries(sortedLanguages).slice(0, 5))

  const totalBytes = Object.values(languages).reduce((total, instances) => total + instances, 0)
  const topLanguagesBytes = Object.values(topLanguages).reduce(
    (total, instances) => total + instances,
    0
  )
  const otherBytes = totalBytes - topLanguagesBytes

  const limitedLanguages = {
    ...topLanguages,
    Other: otherBytes,
  }

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

export default {
  getLanguagesByBytes,
  getLanguagesByRepository,
  getRepositories,
  getUser,
}
