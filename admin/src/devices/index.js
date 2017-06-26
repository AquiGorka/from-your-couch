import React, { PureComponent } from 'react'
import './styles.css'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Layout, Panel, Sidebar } from 'react-toolbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';

class Devices extends PureComponent {

  onAdd = (newDevice) => {
    const { devices = [], ...rest } = this.props.data
    const newDevices = devices.concat([newDevice])
    this.props.onUpdate({ devices: newDevices, ...rest })
  }

  onUpdate = (modifiedDevice) => {
    const { devices, ...rest } = this.props.data
    const newDevices = devices.filter(x => x.id !== modifiedDevice.id)
      .concat([modifiedDevice])
    this.props.onUpdate({ devices: newDevices, ...rest })
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
        <Layout>
          <Panel className="panel-fix">
            {devices.sort((a, b) => a.id > b.id).map((item, index) =>
              <div key={item.id}>
                <Device onDelete={this.onDelete} onUpdate={this.onUpdate} item={item} types={types} />
              </div>
            )}
          </Panel>
          <Sidebar pinned={true}>
            <NewDevice onAdd={this.onAdd} types={types} />
          </Sidebar>
        </Layout>
      </div>
    )
  }
}

class Device extends PureComponent {
  
  onUpdate = () => {
    const { id } = this.props.item
    const { label, type, api, ...rest } = this.props.item
    const modifiedDevice = {
      label: this.refs[`label_${id}`].value,
      type: this.refs[`type_${id}`].value,
      api: {
        verb: this.refs[`verb_${id}`].value,
        url: this.refs[`url_${id}`].value,
      },
      ...rest,
    }
    this.props.onUpdate(modifiedDevice)
  }
  
  render() {
    const { item, onDelete, types } = this.props
    const { label = '', api = {}, id } = item
    const { verb, url } = api
    return (
      <Card className="device-card">
        <CardTitle subtitle={label} />
        <CardText>
          <div className="wrapper">
            <div className="delete" onClick={() => { onDelete(id) }}>x</div>  
            <input
              ref={`label_${item.id}`}
              type="text"
              defaultValue={label}
              placeholder="Label"
              onChange={this.onUpdate} />
            <input
              type="text"
              ref={`url_${item.id}`}
              defaultValue={url}
              placeholder="API URL"
              onChange={this.onUpdate} />
            <input
              type="text"
              ref={`verb_${item.id}`}
              defaultValue={verb}
              placeholder="API Verb"
              onChange={this.onUpdate} />
            <select
              defaultValue={item.type}
              ref={`type_${id}`}
              onChange={this.onUpdate}>
                {types.map((item, index) => 
                  <option key={index} value={item.id}>{item.label}</option>
                )}
            </select>
          </div>
        </CardText>
      </Card>
    ) 
  }
}

class NewDevice extends PureComponent {
  state = { label: '', type: '', verb: '', url: '' }

  onAdd = () => {
    const { types = [] } = this.props
    if (types.length === 0) {
      alert('Please add a new Device Type before trying to add new Devices')
      return
    }
    const type = types.find(x => x.id === this.state.type)
    const { controls = [] } = type
    const newState = controls.map(x => { return { id: x.id, value: 0 }})
    const newDevice = {
      id: `${Date.now()}`,
      label: this.state.label,
      type: this.state.type,
      api: {
        verb: this.state.verb,
        url: this.state.url,
      },
      state: newState,
    }
    this.props.onAdd(newDevice)
  }

  componentDidMount = () => {
    const { types } = this.props
    if (types.length) {
      this.setState({ type: types[0].id })
    }
  }

  render() {
    const { types } = this.props
    return (
      <Card>
        <CardTitle title="Add new Device" />
        <CardText>
          <Input type="text" placeholder="Label" onChange={value => {
            this.setState({ label: value })
          }} />
          <Dropdown ref="type"
            auto
            source={types.map(item => {
              return { label: item.label, value: item.id }
            })}
            value={this.state.type}
            onChange={value => {
              this.setState({ type: value })
            }}
            />
          <Input type="text" ref="verb" placeholder="Verb" onChange={value => {
            this.setState({ verb: value })
          }} />
          <Input type="text" ref="url" placeholder="URL" onChange={value => {
            this.setState({ url: value })
          }} />
          <Button label="Add" onClick={this.onAdd} />
        </CardText>
      </Card>
    )
  }
}

export default Devices
