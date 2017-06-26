import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from 'react-router-dom'
import './App.css'
import firebase from 'firebase'
import firebaseConfig from '../../firebase.js'
import Home from './home'
import Device from './device'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Link as RTLink } from 'react-toolbox/lib/link';
import CouchIcon from './couch-icon.js'
import MDSpinner from "react-md-spinner";

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
    firebase.database().ref().set(data);
  }
  render() {
    const { data = {}, synching } = this.state
    if (synching) {
      return <div className="spinner"><MDSpinner size="64" /></div>
    }
    return (
      <div className="app">

        <AppBar
          title='From Your Couch'
          rightIcon={<CouchIcon />}
          onRightIconClick={() => { window.location = '/'}}
          />

        <Router>
          <Switch>
            <Route exact path='/' render={(props) =>
              <Home {...props} data={data}/>} />
            <Route exact path='/:device' render={(props) =>
              <Device {...props} data={data} onUpdate={this.onUpdate} />} />
            <Route exact path='/:device/:control' render={(props) =>
              <Control {...props} data={data} onUpdate={this.onUpdate} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      
      </div>
    )
  }
}

export default App
