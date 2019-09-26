import PageA from '../pages/pageA/app'
import Home from '../pages/home/app'

interface route {
  path: string,
  component: any
}

var routes:route[] = [
  { path: '/', component: Home },
  { path: '/PageA', component: PageA }
]

export default routes
