import React, { PureComponent } from 'react'

class Select extends PureComponent {
  render() {
    const { state,  onUpate, data = [] } = this.props
    const { id, value } = state
    return (
      <div>
        <select
          defaultValue={value}
          onChange={() => {
            this.props.onUpdate({ id, value: this.refs.input.value })
          }}
          ref="input">
          {data.map((item, index) => 
            <option key={index} value={index}>{item}</option>    
          )}
        </select>
      </div>
    )
  }
}

export default Select
