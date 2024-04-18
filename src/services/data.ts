import octokitService from '~/services/octokit'
import sessionStorage from '~/repositories/sessionStorage'
import { UserFull } from '~/types'

const getUser = async (): Promise<UserFull> => {
  const gitHubUser = sessionStorage.read('gitHubUser')
  if (gitHubUser) {
    return gitHubUser as UserFull
  }

  const userData = await octokitService.fetchUser()
  sessionStorage.write('gitHubUser', userData)
  return userData
}

export default { getUser }
