import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import './App.css'
import firebase from 'firebase'
import firebaseConfig from '../../firebase.js'
import Home from './home'
import Raw from './raw'
import Devices from './devices'
import Types from './types'
import { version } from '../package.json'

const NotFound = () => { return (<div>NotFound</div>) }

class App extends Component {
  state = { synching: true }

  componentDidMount = () => {
    firebase.initializeApp(firebaseConfig)
    firebase.database().ref().on('value', (snapshot) => {
      console.log('Received update: ', snapshot.val());
      this.setState({ data: snapshot.val(), synching: false })
    });
  }
 
  onUpdate = data => {
    console.log('Sending data: ', data)
    if (!data || !data.version) {
      data.version = version
    }
    firebase.database().ref().set(data);
  }
  render() {
    if (this.state.synching) {
      return <div>Loading</div>
    }
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
            <Route exact path='/' render={(props) =>
              <Home {...props} data={this.state.data} onUpdate={this.onUpdate} />} />
            <Route exact path='/devices' render={(props) =>
              <Devices {...props} data={this.state.data} onUpdate={this.onUpdate} />} />
            <Route exact path='/types' render={(props) =>
              <Types {...props} data={this.state.data} onUpdate={this.onUpdate} />} />
            <Route exact path='/raw' render={(props) =>
              <Raw {...props} data={this.state.data} onUpdate={this.onUpdate} />} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
