interface Author {
  date: string
  email: string
  name: string
}

export interface GitHubUser {
  avatarUrl: string
  location: string
  name: string
  profileUrl: string
  registrationDate: string
  username: string
}

export type ColorCode = `#${string}`

interface Commit {
  author: Author
  comment_count: number
  committer: Author | null
  message: string
  tree: Tree
  url: string
}

export interface IssueOrPullRequest {
  closedAt: string | null
  createdAt: string
  state: string
  type: 'issue' | 'pullRequest'
}

export interface IssueOrPullRequestFromAPI {
  active_lock_reason?: string | null | undefined
  assignee: User | null
  assignees?: User[] | null | undefined
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER'
  body?: string | undefined
  closed_at: string | null
  comments: number
  comments_url: string
  created_at: string
  draft?: boolean | undefined
  events_url: string
  html_url: string
  id: number
  labels: Label[]
  labels_url: string
  locked: boolean
  milestone: Milestone | null
  node_id: string
  number: number
  performed_via_github_app: boolean | null
  pull_request?: PullRequest | undefined
  reactions?: Reactions | undefined
  repository_url: string
  score: number
  state: string
  state_reason?: string | null | undefined
  text_matches?:
    | {
        object_url?: string | undefined
        object_type?: string | null | undefined
        property?: string | undefined
        fragment?: string | undefined
        matches?:
          | {
              text?: string | undefined
              indices?: number[] | undefined
            }[]
          | undefined
      }[]
    | undefined
  timeline_url: string
  title: string
  updated_at: string
  url: string
  user: User | null
}

interface Label {
  color?: string | undefined
  default?: boolean | undefined
  description?: string | null | undefined
  id?: number | undefined
  name?: string | undefined
  node_id?: string | undefined
  url?: string | undefined
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

interface Milestone {
  closed_at: string | null
  closed_issues: number
  created_at: string
  creator: User | null
  description: string | null
  due_on: string | null
  html_url: string
  id: number
  labels_url: string
  number: number
  node_id: string
  open_issues: number
  state: 'open' | 'closed'
  title: string
  updated_at: string
  url: string
}

interface PullRequest {
  diff_url: string | null
  html_url: string | null
  merged_at?: string | null | undefined
  patch_url: string | null
  url: string | null
}

interface Reactions {
  '-1': number
  '+1': number
  confused: number
  eyes: number
  heart: number
  hooray: number
  laugh: number
  rocket: number
  total_count: number
  url: string
}

export interface Repository {
  description: string
  homepage: string
  html_url: string
  id: number
  languages_url: string
  name: string
  pushed_at: string
  topics: string[]
  year?: string
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
  topics: string[]
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
  email?: string | null | undefined
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string | null
  html_url: string
  id: number
  login: string
  name?: string | null | undefined
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_at?: string | undefined
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

interface CommitFromAPI {
  author: User
  comments_url: string
  commit: Commit
  committer: User | null
  html_url: string
  node_id: string
  parents: Tree[]
  repository: Repository
  score: number
  sha: string
  url: string
}

export interface CommitsFromAPI {
  total_count: number
  incomplete_results: boolean
  items: CommitFromAPI[] | null
}

interface Tree {
  html_url?: string
  sha: string
  url: string
}
