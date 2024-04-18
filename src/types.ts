export interface GitHubUser {
  avatarUrl: string
  location: string
  name: string
  profileUrl: string
  registrationDate: string
  username: string
}

export interface LanguageMap {
  [language: string]: number
}

interface License {
  key: string
  name: string
  node_id: string
  spdx_id: string
  url: string
}

export interface Repository {
  description: string
  homepage: string
  html_url: string
  id: number
  languages_url: string
  name: string
  pushed_at: Date
  topics: Array<string>
  year: string
}

export interface RepositoryFull {
  allow_forking: boolean
  archive_url: string
  archived: boolean
  assignees_url: string
  blobs_url: string
  branches_url: string
  clone_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  created_at: string
  default_branch: string
  deployments_url: string
  description: string
  disabled: boolean
  downloads_url: string
  events_url: string
  fork: boolean
  forks: number
  forks_count: number
  forks_url: string
  full_name: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  has_downloads: boolean
  has_issues: boolean
  has_pages: boolean
  has_projects: boolean
  has_wiki: boolean
  homepage: string
  hooks_url: string
  html_url: string
  id: number
  is_template: boolean
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  language: string
  languages_url: string
  license: License
  merges_url: string
  milestones_url: string
  mirror_url: string
  name: string
  node_id: string
  notifications_url: string
  open_issues: number
  open_issues_count: number
  owner: User
  private: boolean
  pulls_url: string
  pushed_at: string
  releases_url: string
  size: number
  ssh_url: string
  stargazers_count: number
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  svn_url: string
  tags_url: string
  teams_url: string
  topics: Array<string>
  trees_url: string
  updated_at: string
  url: string
  visibility: string
  watchers: number
  watchers_count: number
  web_commit_signoff_required: boolean
}

export interface TopicMap {
  [topic: string]: number
}

interface User {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  url: string
}

export interface UserFull {
  avatar_url: string
  bio: string
  blog: string
  company: string
  created_at: string
  email: string
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string
  hireable: boolean
  html_url: string
  id: number
  location: string
  login: string
  name: string
  node_id: string
  organizations_url: string
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  twitter_username: string
  type: string
  updated_at: string
  url: string
}
