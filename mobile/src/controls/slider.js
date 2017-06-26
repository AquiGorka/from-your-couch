import React, { PureComponent } from 'react'
import Slider from 'react-toolbox/lib/slider';

class Button extends PureComponent {
  render() {
    const { state, onUpate } = this.props
    const { id, value } = state
    return (
      <Slider
        value={value}
        min={0}
        max={100}
        step={1}
        onChange={value => {
          this.props.onUpdate({ id, value })
        }} />
    )
  }
}

export default Button
