import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import AtlassianProvider from 'next-auth/providers/atlassian'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    AtlassianProvider({
      clientId: `${process.env.JIRA_CLIENT_ID}`,
      clientSecret: `${process.env.JIRA_CLIENT_SECRET}`,

      authorization: {
        url: `${process.env.JIRA_AUTH_URL}`,
        params: {
          audience: 'api.atlassian.com',
          client_id: `${process.env.JIRA_CLIENT_ID}`,
          scope: 'read:jira-work read:jira-user read:me',
          redirect_uri: `${process.env.JIRA_REDIRECT_URI}`,
          response_type: 'code',
          prompt: 'consent'
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken

      if (session.user) {
        session.user.id = token.userId
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token
      }

      if (profile?.account_id) {
        token.userId = profile.account_id
      }

      return token
    }
  }
}

export default NextAuth(authOptions)
