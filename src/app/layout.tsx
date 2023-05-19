import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
