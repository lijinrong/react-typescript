import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import routes from './router/'
import './styles/reset.css'

class MainComponent extends React.Component {
  render () {
    return <div className="container">
      <Router>
        <div>
          {
            routes.map((element) => {
              return (
                <Route exact path={element.path} component={element.component} />
              )
            })
          }
        </div>
      </Router>
    </div>
  }
}

ReactDOM.render(<MainComponent />, document.getElementById('root'))
