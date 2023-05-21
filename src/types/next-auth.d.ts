/* eslint-disable no-unused-vars */

import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    api_url?: string
    access_token?: string
  }

  interface User {
    api_url?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    api_url?: string
    access_token?: string
  }
}
