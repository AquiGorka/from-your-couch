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
import { AppBar, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';
import CouchIcon from './couch-icon.js'
import MDSpinner from "react-md-spinner";
import { List, ListItem } from 'react-toolbox/lib/list';

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
    const { synching } = this.state
    const { history } = this.props
    if (synching) {
      return <div className="spinner"><MDSpinner size="64" /></div>
    }
    return (
      <Router>
        <Layout>
          <NavDrawer pinned={true}>
            <List ripple className="menu">
              <ListItem avatar="https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//home1600.png" caption="Home" to="/" />
              <ListItem avatar="http://icons.iconarchive.com/icons/icons8/windows-8/512/Mobile-Multiple-Devices-icon.png" caption="Devices" to="/devices" />
              <ListItem avatar="https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/settings-512.png" caption="Types" to="/types" />
            </List>
          </NavDrawer>
          <Panel>
            <AppBar title="From Your Couch" rightIcon={<CouchIcon />} />
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
          </Panel>
        </Layout>
      </Router>
    )
  }
}

export default App
