import octokitService from './octokit'
import { UserFull } from '~/types'

const getUser = async (): Promise<UserFull> => {
  const gitHubUser = sessionStorage.getItem('gitHubUser')
  if (gitHubUser) {
    return JSON.parse(gitHubUser) as UserFull
  }

  const userData = await octokitService.fetchUser()
  sessionStorage.setItem('gitHubUser', JSON.stringify(userData))
  return userData
}

export default { getUser }
