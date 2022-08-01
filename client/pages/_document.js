import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { getDataFromTree } from "@apollo/client/react/ssr"
import cookie from 'cookie'

import { initApollo } from "../utils/apollo"

export default class MyDocument extends Document {
    constructor(props) {
        super(props);

        /**
         * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
         */
        const { __NEXT_DATA__, apolloState } = props;
        __NEXT_DATA__.apolloState = apolloState;
    }

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })
            let token = ''
            if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
                const { token: _token } = cookie.parse(ctx.req.headers.cookie)
                token = _token
            }
            const apolloClient = initApollo(token ? token : '', true, ctx.req.headers)
            await getDataFromTree(<ctx.AppTree {...ctx.appProps} />)
            const initialProps = await Document.getInitialProps(ctx)
            const apolloState = apolloClient.extract()

            return {
                ...initialProps,
                apolloState,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}