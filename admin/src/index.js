import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/ru_RU'

import { GlobalStyles } from './components'

import moment from 'moment'
import 'moment/locale/ru'

import apolloClient from './utils/apollo'

import Layout from './pages/layout'
import HomePage from './pages/home'
import LoginPage from './pages/login'

moment.locale('ru')

const App = () => {
    return (
        <StrictMode>
            <ApolloProvider client={apolloClient}>
                <ConfigProvider locale={locale}>
                    <Router>
                        <Routes>
                            <Route
                                path='/'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <HomePage />
                                    </Layout> // default permossion is ['admin']
                                }
                            />
                            <Route
                                path='/login'
                                exact
                                element={
                                    <LoginPage />
                                }
                            />
                        </Routes>
                    </Router>
                    <GlobalStyles />
                </ConfigProvider>
            </ApolloProvider>
        </StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
