import React, { PureComponent } from 'react'
import Switch from 'react-toolbox/lib/switch';

class Button extends PureComponent {
  render() {
    const { state, onUpate } = this.props
    const { id, value } = state
    return (
      <Switch
        checked={!!value}
        onChange={() => {
          this.props.onUpdate({ id, value: !!value ? 0 : 1 })
        }} />
    )
  }
}

export default Button
