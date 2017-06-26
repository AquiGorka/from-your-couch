import React, { PureComponent } from 'react'
import data from '../../../data.js'
import './styles.css'

class Raw extends PureComponent {

  onClick = () => {
    this.props.onUpdate(JSON.parse(this.refs.data.value))
  }
  
  onReset = () => {
    this.props.onUpdate(data)
  }

  render() {
    const { data = {}, onUpdate } = this.props
    return (
      <div className="wrapper">
        <div className="controls">
          <button onClick={this.onClick}>Update</button>
          <button onClick={this.onReset}>Reset</button>
        </div>
        <div>
          <textarea ref="data" defaultValue={JSON.stringify(data, null, 2)} />
        </div>
        <div className="json">{JSON.stringify(data)}</div>
      </div>
    )
  }
}

export default Raw
