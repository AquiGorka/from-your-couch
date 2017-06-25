import React, { PureComponent } from 'react'

class Button extends PureComponent {
  render() {
    const { state, onUpate } = this.props
    const { id, value } = state
    return (
      <div>
        <input
          ref="input"
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={value}
          onChange={() => {
            this.props.onUpdate({ id, value: this.refs.input.value | 0 })
          }}
        />
      </div>
    )
  }
}

export default Button
