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

import AdminsPage from './pages/admin'
import AddAdminPage from './pages/admin/add'
import EditAdminPage from './pages/admin/edit'

import OrganizationsPage from './pages/organization'
import AddOrganizationsPage from './pages/organization/add'
import SingleOrganizationsPage from './pages/organization/single'
import EditOrganizationsPage from './pages/organization/edit'

import BranchsPage from './pages/branch'
import AddBranchsPage from './pages/branch/add'
import EditBranchsPage from './pages/branch/edit'

import GoodsPage from './pages/good'
import AddGoodsPage from './pages/good/add'
import EditGoodsPage from './pages/good/edit'

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
                            <Route
                                path='/admin'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <AdminsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/admin/add'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <AddAdminPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/admin/:id'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <EditAdminPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/organization'
                                exact
                                element={
                                    <Layout roles={['admin', 'moder']}>
                                        <OrganizationsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/organization/add'
                                exact
                                element={
                                    <Layout roles={['org-owner']}>
                                        <AddOrganizationsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/organization/:id'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <SingleOrganizationsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/organization/edit/:id'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <EditOrganizationsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/branch'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <BranchsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/branch/add'
                                exact
                                element={
                                    <Layout roles={['org-owner', 'org-admin']}>
                                        <AddBranchsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/branch/:id'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <EditBranchsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/good'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <GoodsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/good/add'
                                exact
                                element={
                                    <Layout roles={['org-owner', 'org-admin']}>
                                        <AddGoodsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/good/:id'
                                exact
                                element={
                                    <Layout roles={['all']}>
                                        <EditGoodsPage />
                                    </Layout>
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
