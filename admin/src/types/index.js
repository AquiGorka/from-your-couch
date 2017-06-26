import React, { PureComponent } from 'react'
import './styles.css'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Layout, Panel, Sidebar } from 'react-toolbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';

const controls = [
  { id: 'button', label: 'Button' },
  { id: 'slider', label: 'Slider' },
  { id: 'select', label: 'Select' },
]

class Types extends PureComponent {

  // controls
  onAddControl = (modifiedType) => {
    console.log('onaddcontrol: ', modifiedType)
    const { types = [], ...rest } = this.props.data
    const newTypes = types.filter(x => x.id !== modifiedType.id)
      .concat(modifiedType)
    // update states
    // new state id: controlId, value: 0
    const { devices = [], ...another } = rest
    // filter all devices that use the type
    const needToUpdate = devices.filter(device => device.type === modifiedType.id)
    const noNeedToUpdate = devices.filter(device => device.type !== modifiedType.id)
    // new state
    const updatedDevices = needToUpdate.map(item => {
      const { state = [], ...rest } = item
      const newState = state.concat([{ id: newId, value: 0 }])
      return { state: newState, ...rest }
    })
    // add them to the filtered devices and send update
    const newDevices = noNeedToUpdate.concat(updatedDevices)
    //
    this.props.onUpdate({ types: newTypes, devices: newDevices, ...another })
  }
  
  onDeleteControl = (typeId, controlId) => {
    const { types = [], ...rest } = this.props.data
    const { controls = [], ...other } = types.find(x => x.id === typeId)
    const newControls = controls.filter(x => x.id !== controlId)
    const newTypes = types.filter(x => x.id !== typeId)
      .concat([{ controls: newControls, ...other }]) 
    // update states
    // remove state: id: controlId
    const { devices = [], ...another } = rest
    // filter all devices that use the type
    const needToUpdate = devices.filter(device => device.type === typeId)
    const noNeedToUpdate = devices.filter(device => device.type !== typeId)
    // filter out removed states
    const updatedDevices = needToUpdate.map(item => {
      const { state = [], ...rest } = item
      const newState = state.filter(x => x.id !== controlId)
      return { state: newState, ...rest }
    })
    // add them to the filtered devices and send update
    const newDevices = noNeedToUpdate.concat(updatedDevices)
    //
    this.props.onUpdate({ types: newTypes, devices: newDevices, ...another })
  }

  onUpdateControl = (typeId, controlId,  newControl) => {
    const { types = [], ...rest } = this.props.data
    const { controls = [], ...other } = types.find(x => x.id === typeId)
    const newControls = controls.filter(x => x.id !== controlId)
      .concat([newControl])
    const newTypes = types.filter(x => x.id !== typeId)
      .concat([{ controls: newControls, ...other }]) 
    // update states
    // modify state to value: zero, id: controlId (like resetting)
    // new state id: controlId, value: 0
    const { devices = [], ...another } = rest
    // filter all devices that use the type
    const needToUpdate = devices.filter(device => device.type === typeId)
    const noNeedToUpdate = devices.filter(device => device.type !== typeId)
    // reset values
    const updatedDevices = needToUpdate.map(item => {
      const { state, ...rest } = item
      const newState = state.filter(x => x.id !== controlId)
        .concat([{ id: controlId, value: 0 }])
      return { state: newState, ...rest }
    })
    // add them to the filtered devices and send update
    const newDevices = noNeedToUpdate.concat(updatedDevices)
    //
    this.props.onUpdate({ types: newTypes, devices: newDevices, ...another })
  }

  // types
  onAdd = (newType) => {
    const { types = [], ...rest } = this.props.data
    const newTypes = types.concat([newType])
    this.props.onUpdate({ types: newTypes, ...rest })
  }

  onUpdate = (modifiedType) => {
    const { types, ...rest } = this.props.data
    const newTypes = types.filter(x => x.id !== modifiedType.id)
      .concat([modifiedType]) 
    this.props.onUpdate({ types: newTypes,  ...rest })
  }

  onDelete = (id) => {
    // alert in case there are devices associated to this type
    const { devices = [] } = this.props.data
    const associated = devices.filter(x => x.type === id)
    if (associated.length) {
      const whichOnes = associated.map(x => x.label)
      alert(`You can't delete a Device Type if it is associated to one or more Devices (${whichOnes}).`)
      return
    }
    //
    const { types, ...rest } = this.props.data
    const newTypes = types.filter(x => x.id !== id)
    this.props.onUpdate({ types: newTypes, ...rest })
  }

  render() {
    const { data = {}, onUpdate } = this.props
    const { types = [] } = data
    return (
      <div>
        <Layout>
          <Panel className="panel-fix">
            {types.sort((a, b) => a.id > b.id).map(item => 
              <div key={`type_${item.id}`}>
                <DeviceType
                  item={item}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onDeleteControl={this.onDeleteControl}
                  onUpdateControl={this.onUpdateControl} />
              </div>
            )}
          </Panel>
          <Sidebar pinned={true}>
            <Card>
              <CardTitle title="Actions" />
            </Card>
            <NewDeviceType onAdd={this.onAdd} />
            <NewDeviceTypeControl
              types={types}
              onAdd={this.onAddControl} />
            <NewDeviceTypeControlData
              types={types}
              onUpdate={this.onUpdateControl} />
          </Sidebar>
        </Layout>
      </div>    
    )
  }
}

class NewDeviceTypeControl extends PureComponent {
  
  state = { typeId: -1 }
  
  onAdd = () => {
    // default label
    if (this.state.typeId === -1) {
      return
    }
    // default adds button and then it is "modifyable"
    const { onAdd, types } = this.props
    const type = types.find(x => x.id === this.state.typeId)
    const { controls = [], ...rest  } = type
    const newControl = {
      id: `${Date.now()}`,
      label: 'Control name',
      type: 'button'
    }
    const newControls = controls.concat([newControl])
    const modifiedType = { controls: newControls, ...rest }
    onAdd(modifiedType)
  }
  
  render() {
    const { types = [] } = this.props
    const data = [{ id: -1, label: 'Choose to which Device Type'}]
      .concat(types).map(x => {
        return { label: x.label, value: x.id }})
    return (
      <Card>
        <CardTitle subtitle="Add new Control" />
        <CardText>
          <select ref="select" defaultValue={-1} onChange={() => {
              this.setState({ typeId: this.refs.select.value })
            }}>
            {data.map(item => {
              return <option key={`new_control_${item.value}`} value={item.value}>{item.label}</option>
            })}
          </select>
          <Button label="Add" onClick={this.onAdd} />
        </CardText>
      </Card>
    ) 
  }
}

class DeviceType extends PureComponent {

  onUpdate = () => {
    const { item, onUpdate } = this.props
    const { id } = item
    const { label, ...rest } = item
    const newLabel =this.refs[`label_${id}`].value
    const modifiedType = {
      label: newLabel, ...rest}
    onUpdate(modifiedType)
  }

  render() {
    const {
      item,
      onDeleteControl,
      onUpdateControl,
      onUpdate,
      onDelete
    } = this.props
    const { id, label = '', controls = [] } = item
    return (
        <Card className="type-card">
          <CardTitle subtitle={label} />
          <CardText>
            <div className="wrapper">
              <div className="delete" onClick={() => { onDelete(id) }}>x</div>  
              <input
                ref={`label_${id}`}
                type="text"
                defaultValue={label}
                onChange={this.onUpdate} />
              <ControlsList
                controls={controls}
                onDelete={(controlId) => {
                  onDeleteControl(id, controlId)
                }}
                onUpdate={(controlId, newControl) => {
                  onUpdateControl(id, controlId, newControl)
                }} />
            </div>
          </CardText>
        </Card>
    )
  }
}

class NewDeviceType extends PureComponent {
  state = { label: '' }

  onAdd = () => {
    const newType = {
      id: `${Date.now()}`,
      label: this.refs.input.value,
    }
    this.props.onAdd(newType)
  }

  render() {
    return (
      <Card>
        <CardTitle subtitle="Add new Device Type" />
        <CardText>
          <div>
            <input type="text" placeholder="New device type name" ref="input" />
          </div>
          <Button label="Add" onClick={this.onAdd} />
        </CardText>
      </Card>
    )
  }
}

class ControlsList extends PureComponent {

  render() {
    const { controls = [] } = this.props
    return (
      <ul className="control-list">
        {controls.sort((a, b) => a.id > b.id).map(item => 
          <li className="control-item" key={`control_${item.id}`}>
            <div className="delete-control" onClick={() => { this.props.onDelete(item.id) }}>x</div>  
            <input
              onChange={() => {
                const { label, ...rest } = item
                const newLabel = this.refs[`control_${item.id}_label`].value
                this.props.onUpdate(item.id, { label: newLabel, ...rest })
              }}
              ref={`control_${item.id}_label`}
              type="text"
              defaultValue={item.label} />
            <ControlPicker control={item} onUpdate={(newControlType) => {
              const { type, ...rest } = item
              this.props.onUpdate(item.id, { type: newControlType, ...rest })
            }} />
            <ControlDatalist
              type={item.type}
              data={item.data}
              onUpdate={(newData) => {
                const { data, ...rest } = item
                this.props.onUpdate(item.id, { data: newData, ...rest })
              }} />
          </li>    
        )}
      </ul>
    )
  }
}

class ControlPicker extends PureComponent {
  render() {
    const { control } = this.props
    return (
      <select
        onChange={() => {
          this.props.onUpdate(this.refs[`control_${control.id}_select`].value)
        }}
        ref={`control_${control.id}_select`}
        defaultValue={control.type}>
          {controls.map((item, index) => 
            <option key={index} value={item.id}>{item.label}</option>
        )}
      </select>
    )
  }
}

class ControlDatalist extends PureComponent {
  render() {
    const { type, data = [], onUpdate } = this.props
    if (type !== 'select') {
      return <div></div>
    }
    return (
      <ul className="control-data-list">
        {data.map((item, index) =>
          <li className="control-data-item" key={`data_${item}_${index}`}>
            <div className="control-data-delete" onClick={() => {
              const newData = data.filter((x, i) => i !== index)
              onUpdate(newData)
            }}>x</div>
            <div><input ref="label" type="text" defaultValue={item} /></div>
          </li>
        )}
      </ul>
    )
  }
}

class NewDeviceTypeControlData extends PureComponent {
  
  state = { typeId: -1, controlId: -1 }
  
  onAdd = () => {
    // default labels
    if (this.state.typeId === -1) {
      alert('Please select a Device Type from the list')
      return
    }
    if (this.state.controlId === -1) {
      alert('Please select a Control from the list')
      return
    }
    const { onUpdate, types } = this.props
    const type = types.find(x => x.id === this.state.typeId)
    const { controls, ...rest } = type
    const control = controls.find(x => x.id === this.state.controlId)
    const { data = [], ...other } = control
    const newData = data.concat([this.refs.input.value])
    const newControl = { data: newData, ...other }
    const newControls = controls.filter(x => x.id === this.state.controlId)
        .concat([newControl])
    const newType = { controls: newControls, ...other }
    // TODO refactor onUpdateControl to receive the correct signature
    //onUpdate(newType)
    onUpdate(this.state.typeId, this.state.controlId, newControl)
  }
  
  render() {
    const { types = [] } = this.props
    const data = [{ id: -1, label: 'Choose to which Device Type'}]
      .concat(types).map(x => {
        return { label: x.label, value: x.id }})
    const type = types.find(x => x.id === this.state.typeId) || {}
    const { controls = [] } = type
    const controlsData = [{ id: -1, label: 'Choose to which Select Control'}]
      .concat(controls.filter(x => x.type === 'select'))
        .map(x => { return { value: x.id, label: x.label }})
    return (
      <Card>
        <CardTitle subtitle="Add new item to list" />
        <CardText className="data-add-item-wrapper">
          <select ref="select" defaultValue={-1} onChange={() => {
              this.setState({ typeId: this.refs.select.value })
            }}>
            {data.map(item => {
              return <option key={`new_control_${item.value}`} value={item.value}>{item.label}</option>
            })}
          </select>
          <select ref="select_control" defaultValue={-1} onChange={() => {
              this.setState({ controlId: this.refs.select_control.value })
            }}>
            {controlsData.map(item => {
              return <option key={`new_control_${item.value}`} value={item.value}>{item.label}</option>
            })}
          </select>
          <div>
            <input type="text" ref="input" placeholder="New item" />
          </div>
          <Button label="Add" onClick={this.onAdd} />
        </CardText>
      </Card>
    ) 
  }
}

export default Types
