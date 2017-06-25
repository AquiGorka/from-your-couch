import React, { PureComponent } from 'react'
import data from '../../../data.js'
import './styles.css'

class Home extends PureComponent {

  onClick = () => {
    this.props.onUpdate(JSON.parse(this.refs.data.value))
  }
  
  onReset = () => {
    this.props.onUpdate(data)
  }

  render() {
    const { data = {}, onUpdate } = this.props
    const { devices = [], types = [] } = data
    return (
      <div>
        <ul>
          {devices.sort((a, b) => a.id > b.id).map(item => {
            const type = types.find(x => x.id === item.type)
            const { label = '' } = type
            return (
              <li key={item.id}>
                <div>
                  {`${item.label} (${label})`}
                </div>
                <ul>
                  {item.state.map(curr => {
                    const { controls = [] } = type
                    const control = controls.find(x => x.id === curr.id)
                    const { label = '' } = control
                    return (
                      <li key={`${item.id}_${curr.id}`}>
                        <div>{`${label}: ${curr.value}`}</div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Home
