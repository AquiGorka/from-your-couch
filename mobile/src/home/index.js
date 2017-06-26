import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

class Home extends PureComponent {

  onClick = () => {
    this.props.onUpdate(JSON.parse(this.refs.data.value))
  }

  render() {
    const { data = {} } = this.props
    const { devices = [] } = data
    return (
      <div className="section">
        <ul>
          {devices.sort((a, b) => a.id > b.id).map(item => 
            <li key={item.id}>
              <Link to={`/${item.id}`}>
                {item.label}
              </Link>
            </li>    
          )}
        </ul>
      </div>
    )
  }
}

export default Home
