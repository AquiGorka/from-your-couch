import React, { PureComponent } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown';

class Select extends PureComponent {
  render() {
    const { state,  onUpate, data = [] } = this.props
    const { id, value } = state
    return (
      <Dropdown
        auto
        onChange={(value) => {
          this.props.onUpdate({ id, value })
        }}
        source={data.map((item, index) => { return { value: index, label: item }})}
        value={value} />
    )
  }
}

export default Select
