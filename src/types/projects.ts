export default interface PaginatedProjects {
  self: string
  nextPage: string
  maxResults: number
  startAt: number
  total: number
  isLast: boolean
  values: Projects[]
}

export interface Projects {
  self: string
  id: string
  key: string
  name: string
  avatarUrls: AvatarUrls
  projectCategory: ProjectCategory
  simplified: boolean
  style: string
  insight: Insight
}

interface AvatarUrls {
  '48x48': string
  '24x24': string
  '16x16': string
  '32x32': string
}

interface ProjectCategory {
  self: string
  id: string
  name: string
  description: string
}

interface Insight {
  totalIssueCount: number
  lastIssueUpdateTime: string
}
