import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import routes from './router/'
import './styles/reset.css'

class MainComponent extends React.Component {
    render(): JSX.Element {
        return (
            <div className="container">
                <Suspense fallback={<div>loading</div>}>
                    <Router>
                        <div>
                            {routes.map((element, index) => {
                                return <Route exact path={element.path} component={element.component} key={index} />
                            })}
                        </div>
                    </Router>
                </Suspense>
            </div>
        )
    }
}

const render = (): void => {
    ReactDOM.render(<MainComponent />, document.getElementById('root'))
}

render()

if (module.hot) {
    module.hot.accept('./router/', () => {
        render()
    })
}
