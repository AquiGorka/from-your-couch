import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import './App.css'

const Home = () => { return (<div>Home</div>) }
const Devices = () => { return (<div>Devices</div>) }
const Types = () => { return (<div>Types</div>) }
const NotFound = () => { return (<div>NotFound</div>) }

class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/devices">Devices</Link></li>
              <li><Link to="/types">Types</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/devices' component={Devices} />
            <Route exact path='/types' component={Types} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
