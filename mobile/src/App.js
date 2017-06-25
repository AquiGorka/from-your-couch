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
const Home = () => { return <div>Home</div> }
const Device = () => { return <div>Device</div> }
const Control = () => { return <div>Control</div> }

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
      return <div>Loading</div>
    }
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} data={data}/>} />
          <Route exact path='/:device' render={(props) => <Device {...props} data={data} onUpdate={this.onUpdate} />} />
          <Route exact path='/:device/:control' render={(props) => <Control {...props} data={data} onUpdate={this.onUpdate} />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
