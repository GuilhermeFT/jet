import { getServerSession } from 'next-auth'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const getSession = async () => {
  return await getServerSession(authOptions)
}
