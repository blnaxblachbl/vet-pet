import { useMemo } from 'react'
import Head from 'next/head'
import NextApp from 'next/app'
import { ApolloProvider } from "@apollo/client"
import cookie from 'cookie'
import { ToastContainer } from 'react-toastify'
import { Settings } from 'luxon'

import {
    GlobalStyles,
    Padding,
    Header,
    Footer,
    AuthComponent,
    Menu,
    TabBar,
    ImageViewer,
    ScrollToTop
} from '../components'
import { initApollo } from "../utils/apollo"
import { useMobile } from '../utils/hooks'
import ContextProvider from '../context'

Settings.defaultLocale = "ru"

function MyApp({ Component, pageProps, token, headers, userAgent }) {
    const client = useMemo(() => initApollo(token, false, headers), [token, headers])
    const isMobile = useMobile(userAgent)

    return (
        <>
            <Head>
                <title>Vet Pet</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            <ApolloProvider client={client}>
                <ContextProvider>
                    <Header isMobile={isMobile} />
                    <Padding isMobile={isMobile}>
                        <Menu isMobile={isMobile} />
                        <Component isMobile={isMobile} {...pageProps} />
                    </Padding>
                    <Footer />
                    <TabBar />
                    <AuthComponent />
                </ContextProvider>
            </ApolloProvider>
            <ToastContainer
                position='top-center'
            />
            <GlobalStyles />
            <ImageViewer />
            <ScrollToTop />
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext)

    const { req } = appContext.ctx
    if (req && req.headers) {
        try {
            appProps['userAgent'] = req.headers['user-agent']
            appProps['headers'] = req.headers
        } catch (e) {
            console.error(e)
        }
        if (req.headers.cookie) {
            try {
                const _data = cookie.parse(req.headers.cookie)
                const { token } = _data
                appProps['token'] = token ? token : ''
            } catch (e) {
                console.error(e)
            }
        }
    }

    return { ...appProps }
}

export default MyApp
