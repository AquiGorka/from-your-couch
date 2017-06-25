import React, { PureComponent } from 'react'
import './styles.css'

const controls = [
  { id: 'button', label: 'Button' },
  { id: 'slider', label: 'Slider' },
  { id: 'select', label: 'Select' },
]

class Types extends PureComponent {

  // controls
  onAddControl = (typeId) => {
    // default adds button and then it is "modifyable"
    const { types = [], ...rest } = this.props.data
    const { controls = [], ...other } = types.find(x => x.id === typeId)
    const newId = Date.now()
    const newControl = {
      id: newId,
      label: 'New Control',
      type: 'button',
    }
    const newControls = controls.concat([newControl])
    const newTypes =  types.filter(x => x.id !== typeId)
      .concat([{ controls: newControls, ...other }])
    // update states
    // new state id: controlId, value: 0
    const { devices, ...another } = rest
    // filter all devices that use the type
    const needToUpdate = devices.filter(device => device.type === typeId)
    const noNeedToUpdate = devices.filter(device => device.type !== typeId)
    // new state
    const updatedDevices = needToUpdate.map(item => {
      const { state, ...rest } = item
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
    const { controls, ...other } = types.find(x => x.id === typeId)
    const newControls = controls.filter(x => x.id !== controlId)
    const newTypes = types.filter(x => x.id !== typeId)
      .concat([{ controls: newControls, ...other }]) 
    // update states
    // remove state: id: controlId
    const { devices, ...another } = rest
    // filter all devices that use the type
    const needToUpdate = devices.filter(device => device.type === typeId)
    const noNeedToUpdate = devices.filter(device => device.type !== typeId)
    // filter out removed states
    const updatedDevices = needToUpdate.map(item => {
      const { state, ...rest } = item
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
    const { controls, ...other } = types.find(x => x.id === typeId)
    const newControls = controls.filter(x => x.id !== controlId)
      .concat([newControl])
    const newTypes = types.filter(x => x.id !== typeId)
      .concat([{ controls: newControls, ...other }]) 
    // update states
    // modify state to value: zero, id: controlId (like resetting)
    // new state id: controlId, value: 0
    const { devices, ...another } = rest
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
  onAdd = () => {
    const { types = [], ...rest } = this.props.data
    const newType = {
      id: Date.now(),
      label: this.refs.label.value,
    }
    const newTypes = types.concat([newType])
    this.props.onUpdate({ types: newTypes, ...rest })
  }

  onUpdate = (id) => {
    const { types, ...rest } = this.props.data
    const modifiedType = {
      id: id,
      label: this.refs[`label_${id}`].value,
      type: this.refs[`type_${id}`].value,
      api: {
        verb: this.refs[`verb_${id}`].value,
        url: this.refs[`url_${id}`].value,
      },
    }
    const newTypes = types.filter(x => x.id !== id).concat([modifiedType]) 
    this.props.onUpdate({ types: newTypes,  ...rest })
  }

  onDelete = (id) => {
    // alert in case there are devices associated to this type
    const { devices } = this.props.data
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
        <div>
          <input type="text" ref="label" />
          <input type="button" onClick={this.onAdd} value="Add" />
        </div>
        <ul>
          {types.sort((a, b) => a.id > b.id).map((item, index) => 
            <li key={item.id}>
              <div onClick={() => {
                this.onDelete(item.id)
              }}>-</div>  
              <div onClick={() => {
                this.onUpdate(item.id)
              }}>o</div>
              <div onClick={() => {
                this.onAddControl(item.id)
              }}>a</div>
              <div>
                <input ref={`label_${item.id}`} type="text" defaultValue={item.label} />
              </div>
              <ControlsList
                controls={item.controls}
                onDelete={(controlId) => {
                  this.onDeleteControl(item.id, controlId)
                }}
                onUpdate={(controlId, newControl) => {
                  this.onUpdateControl(item.id, controlId, newControl)
                }} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

class ControlsList extends PureComponent {

  render() {
    const { controls = [] } = this.props
    return (
      <ul>
        {controls.sort((a, b) => a.id > b.id).map(item => 
          <li key={`control_${item.id}`}>
            <div onClick={() => {
              this.props.onDelete(item.id)
            }}>-</div>  
            <div onClick={() => {
              const { label, ...rest } = item
              const newLabel = this.refs[`control_${item.id}_label`].value
              this.props.onUpdate(item.id, { label: newLabel, ...rest })
            }}>o</div>
            <div>
              <input ref={`control_${item.id}_label`} type="text" defaultValue={item.label} />
              <ControlPicker control={item} onUpdate={(newControlType) => {
                const { type, ...rest } = item
                this.props.onUpdate(item.id, { type: newControlType, ...rest })
              }} />
            </div>
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
      <div>
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
      </div>
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
      <div>
        <ul>
          {data.map((item, index) =>
            <li key={`data_${item}_${index}`}>
              <div onClick={() => {
                const newData = data.filter((x, i) => i !== index)
                onUpdate(newData)
              }}>-</div>
              <div><input ref="label" type="text" defaultValue={item} /></div>
            </li>
          )}
        </ul>
        <div>
          <input type="text" ref="new" />
          <input type="button" value="Add" onClick={() => {
            const newLabel = this.refs.new.value
            const newData = data.concat([newLabel])
            onUpdate(newData)
          }} />
        </div>
      </div>
    )
  }
}

export default Types
