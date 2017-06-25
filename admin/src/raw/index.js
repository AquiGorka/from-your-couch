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
      <div>
        <textarea ref="data" defaultValue={JSON.stringify(data, null, 2)} />
        <input type="button" onClick={this.onClick} value="Update" />
        <input type="button" onClick={this.onReset} value="Reset" />
        <div>{JSON.stringify(data)}</div>
      </div>
    )
  }
}

export default Raw
