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
      },
      profile: async (profile, tokens) => {
        const res = await fetch(
          'https://api.atlassian.com/oauth/token/accessible-resources',
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`
            }
          }
        )

        const data = await res.json()

        const account = data[0]

        const url = `https://api.atlassian.com/ex/jira/${account.id}/rest/api/3`

        return {
          id: profile.account_id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          api_url: url
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      if (token?.api_url) {
        session.api_url = token.api_url
      }

      if (token?.access_token) {
        session.access_token = token.access_token
      }

      return session
    },
    async jwt({ token, user, account }) {
      if (user?.api_url) {
        token.api_url = user.api_url
      }

      if (account?.access_token) {
        token.access_token = account.access_token
      }

      return token
    }
  }
}

export default NextAuth(authOptions)
