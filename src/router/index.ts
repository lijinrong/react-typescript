import { lazy } from 'react'

const Home = lazy(() => import('../pages/home/app'))
const PageA = lazy(() => import('../pages/pageA/app'))

interface Route {
    path: string
    component: any
}

const routes: Route[] = [{ path: '/', component: Home }, { path: '/PageA', component: PageA }]

export default routes
