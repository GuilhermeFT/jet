import { redirect } from 'next/navigation'

import PaginatedProjects from '@/types/projects'

import { get } from '../api'

export const getAllProjects = async () => {
  const projects = await get<PaginatedProjects>('/project/search')

  if (projects?.error) {
    redirect('/api/auth/signin')
  }

  return projects?.data
}
