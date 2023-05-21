import { getSession } from '@/hooks/getSession'

interface Response<T> {
  status: number
  error?: Error
  data?: T
}

const get = async <T>(path: string): Promise<Response<T>> => {
  const session = await getSession()

  if (!session?.api_url || !session?.access_token) {
    return {
      status: 401,
      error: new Error('Unauthorized')
    }
  }

  const response = await fetch(
    `${session.api_url}${path.endsWith('/') ? path : `/${path}`}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        Accept: 'application/json'
      }
    }
  )

  const data = await response.json()

  if (response.ok) {
    return {
      status: response.status,
      data: data as T
    }
  }

  return {
    status: response.status,
    error: new Error(data.errorMessages)
  }
}

export { get }
