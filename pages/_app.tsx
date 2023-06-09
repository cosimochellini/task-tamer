import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { DefaultLayout } from '@/layouts/default'
import { AuthenticatedUserProvider } from '@/providers/AuthenticatedUser'
import { ModalProvider } from '@/providers/ModalProvider'
import { LoadingProvider } from '@/providers/LoadingProvider'

type Props = AppProps<{ session: Session }>

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => (
  <SessionProvider session={session}>
    <AuthenticatedUserProvider>
      <DefaultLayout>
        <Component {...pageProps} />
        <ModalProvider />
        <LoadingProvider />
      </DefaultLayout>
    </AuthenticatedUserProvider>
  </SessionProvider>
)

export default App
