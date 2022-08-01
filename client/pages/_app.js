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
} from '../components'
import { initApollo } from "../utils/apollo"
import { useMobile } from '../utils/hooks'

Settings.defaultLocale = "ru"

function MyApp({ Component, pageProps, token, headers }) {
    const client = useMemo(() => initApollo(token, false, headers), [token, headers])
    const isMobile = useMobile()

    return (
        <>
            <Head>
                <title>Vet Pet</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />


                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            <ApolloProvider client={client}>
                <Header isMobile={isMobile} />
                <Padding isMobile={isMobile}>
                    <Component isMobile={isMobile} {...pageProps} />
                </Padding>
                <Footer />
            </ApolloProvider>
            <ToastContainer
                position='top-center'
            />
            <GlobalStyles />
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext)

    const { req } = appContext.ctx
    if (req && req.headers) {
        try {
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
