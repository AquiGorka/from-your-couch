import React, { PureComponent } from 'react'
import './styles.css'

class Devices extends PureComponent {

  onAdd = () => {
    const newDevice = {
      id: Date.now(),
      label: this.refs.label.value,
      type: this.refs.type.value,
      api: {
        verb: this.refs.verb.value,
        url: this.refs.url.value,
      },
    }
    const { devices = [], ...rest } = this.props.data
    this.props.onUpdate({ devices: devices.concat([newDevice]), ...rest })
  }

  onUpdate = (id) => {
    const { devices, ...rest } = this.props.data
    const modifiedDevice = {
      id: id,
      label: this.refs[`label_${id}`].value,
      type: this.refs[`type_${id}`].value,
      api: {
        verb: this.refs[`verb_${id}`].value,
        url: this.refs[`url_${id}`].value,
      },
    }
    this.props.onUpdate({ devices: devices.filter(x => x.id !== id).concat([modifiedDevice]), ...rest })
  }

  onDelete = (id) => {
    const { devices, ...rest } = this.props.data
    this.props.onUpdate({ devices: devices.filter(x => x.id !== id), ...rest })
  }

  render() {
    const { data = {}, onUpdate } = this.props
    const { devices = [], types = [] } = data
    return (
      <div>
        <div>
          <input type="text" ref="label" placeholder="Label" />
          <select ref="type">
            {types.map((item, index) => 
              <option key={index} value={item.id}>{item.label}</option>
            )}
          </select>
          <input type="text" ref="verb" placeholder="Verb" />
          <input type="text" ref="url" placeholder="URL" />
          <input type="button" onClick={this.onAdd} value="Add" />
        </div>
        <ul>
          {devices.sort((a, b) => a.id > b.id).map((item, index) =>
            <li key={item.id}>
              <div onClick={() => {
                this.onDelete(item.id)
              }}>-</div>  
              <div onClick={() => {
                this.onUpdate(item.id)
              }}>o</div>
              <div>
                <div>
                  <input ref={`label_${item.id}`} type="text" defaultValue={item.label} />
                </div>
                <div>
                  <div>URL</div>
                 <input type="text" ref={`url_${item.id}`} defaultValue={item.api.url} />
                </div>
                <div>
                  <div>Verb</div>
                  <input type="text" ref={`verb_${item.id}`} defaultValue={item.api.verb} />
                </div>
                <div>
                  <select defaultValue={item.type} ref={`type_${item.id}`}>
                    {types.map((item, index) => 
                      <option key={index} value={item.id}>{item.label}</option>
                    )}
                  </select>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Devices
