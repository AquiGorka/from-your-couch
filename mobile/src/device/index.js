import React, { PureComponent } from 'react'
import Slider from '../controls/slider.js'
import Select from '../controls/select.js'
import Button from '../controls/button.js'
import './styles.css'

class Input extends PureComponent {
  render() {
    const { state, onUpate } = this.props
    const { id, value } = state
    return (
      <div>
        <input ref="input" type="text" defaultValue={value} />
        <input type="button" value="Send" onClick={() => {
          this.props.onUpdate({ id, value: this.refs.input.value })
        }} />   
      </div>
    )
  }
}

const ControlMapper = (props) => {
  let control = <Input {...props} /> 
  switch(props.type) {
    case 'button':
        control = <Button {...props} />
        break;
    case 'slider':
        control = <Slider {...props} />
        break;
    case 'select':
        control = <Select {...props} />
        break;
  }
  return control
}

class Device extends PureComponent {

  onUpdate = (deviceId, modifiedState) => {
    const { devices, ...rest } = this.props.data
    const device = devices.find(x => x.id === deviceId)
    const { state, ...other } = device
    const newState = state.filter(x => x.id !== modifiedState.id)
      .concat([modifiedState])
    const newDevices = devices.filter(x => x.id !== deviceId)
      .concat([{ state: newState, ...other }])
    this.props.onUpdate({ devices: newDevices, ...rest })
  }

  render() {
    const { match, data = {} } = this.props
    const { devices = [], types = [] } = data
    const device = devices.find(x => x.id === match.params.device)
    if (!device) {
      return <div>Device Not Found</div>
    }
    const { state } = device
    const type = types.find(x => x.id === device.type)
    const { controls = [] } = type
    return (
      <div>
        <div>{`${device.label} (${type.label})`}</div>
        <ul>
          {controls.sort((a, b) => a.id > b.id).map((item, index) => {
            const controlState = state.find(x => x.id === item.id)
            const { value } = state
            const { id, type, label } = item
            if (!controlState) {
              return <li key={index}></li>
            }
            return (
              <li key={index}>
                <div>
                  <div>{ label }</div>
                  <div>{ value }</div>
                  <ControlMapper
                    data={item.data}
                    state={controlState}
                    type={type}
                    onUpdate={(id, val) => {
                      this.onUpdate(device.id, id, value)
                    }}
                    />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Device
