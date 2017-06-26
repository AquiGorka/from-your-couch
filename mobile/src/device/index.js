import React, { PureComponent } from 'react'
import Slider from '../controls/slider.js'
import Select from '../controls/select.js'
import Button from '../controls/button.js'
import './styles.css'
import { Card, CardMedia, CardTitle, CardText } from 'react-toolbox/lib/card';

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
    const { label: deviceLabel } = device
    const { label: typeLabel } = type
    return (
      <div>
        <Card>
          <CardTitle
            avatar="https://placeimg.com/80/80/animals"
            title={deviceLabel}
            subtitle={typeLabel}
            />
          <CardMedia
            aspectRatio="wide"
            image="https://placeimg.com/800/450/nature"
            />
          <CardText>
            <ul>
              {controls.sort((a, b) => a.id > b.id).map((item, index) => {
                const controlState = state.find(x => x.id === item.id)
                const { value } = state
                const { id, type, label } = item
                if (!controlState) {
                  return <li key={index}></li>
                }
                return (
                  <li key={item.id}>
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
                        label={label} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Device
