import React, { PureComponent } from 'react'

class Button extends PureComponent {
  render() {
    const { state, onUpate } = this.props
    const { id, value } = state
    return (
      <div>
        <input
          ref="input"
          type="checkbox"
          checked={!!value}
          onChange={() => {
            this.props.onUpdate({ id, value: !!value ? 0 : 1 })
          }}
        />
      </div>
    )
  }
}

export default Button
