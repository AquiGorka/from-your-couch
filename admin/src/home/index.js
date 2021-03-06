import React, { PureComponent } from 'react'
import data from '../../../data.js'
import './styles.css'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Toggle from 'react-toggle'
import './toggle.css'
import ProgressLabel from 'react-progress-label'

class Home extends PureComponent {

  onClick = () => {
    this.props.onUpdate(JSON.parse(this.refs.data.value))
  }
  
  onReset = () => {
    this.props.onUpdate(data)
  }

  render() {
    const { data = {}, onUpdate } = this.props
    const { devices = [], types = [] } = data
    return (
      <div>
          {devices.sort((a, b) => a.id > b.id).map(item => {
            const type = types.find(x => x.id === item.type)
            const { label: typeLabel = '' } = type
            const { state = [], label = ''  } = item
            return (
              <div key={item.id}>
                <Card className="card-layout">
                  <CardTitle
                    title={label}
                    subtitle={typeLabel}
                    />
                <CardText>
                  <ul className="list">
                    {state.sort((a, b) => a.id > b.id).map(curr => {
                      const { controls = [] } = type
                      const control = controls.find(x => x.id === curr.id)
                      return (
                        <li key={`${item.id}_${curr.id}`}>
                          <div className="wrapper">
                            <Mapper control={control} state={curr} />
                          </div>
                        </li>
                      )
                   })}
                  </ul>
                </CardText>
                </Card>
              </div>
            )
          })}
      </div>
    )
  }
}

const Raw = (props) => {
  const { control = {}, state = {} } = props
  const { label = '' } = control
  const { value = 0 } = state
  return <div>{`${label}: ${value}`}</div>
}

const Button = (props) => {
  const { control = {}, state = {} } = props
  const { label = '' } = control
  const { value = 0 } = state
  return (
    <div className="item button">
      <div className="label">
      {`${label}`}
      </div>
      <div className="display">
      <Toggle checked={!!value} value="yes" disabled={true} />
      </div>
    </div>
  )
}

const Select = (props) => {
  const { control = {}, state = {} } = props
  const { value: stateValue = 0 } = state
  const { data = [], label = '' } = control
  const value = data.find((x, i) => i == stateValue)
  return (
    <div className="item select">
      <div className="label">
      {`${label}`}
      </div>
      <div className="display">
      {`${value}`}
      </div>
    </div>
  )
}

const Slider = (props) => {
  const { control = {}, state = {} } = props
  const { label = '' } = control
  const { value = 0 } = state
  const textStyle = { 'fontSize': 12, 'fill': '#ffffff', 'textAnchor': 'middle' }
  return (
    <div className="item slider">
      <div className="label">
      {`${label}`}
      </div>
      <div className="display">
      <ProgressLabel
        progress={value}
        startDegree={60}
        progressWidth={8}
        trackWidth={20}
        cornersWidth={4}
        size={80}
        fillColor="black"
        trackColor="white"
        progressColor="#ADFF2F">
          <text x="40" y="45" style={textStyle}>{`${value}%`}</text>
      </ProgressLabel>
      </div>
    </div>
  )
}

class Mapper extends PureComponent {
  render() {
    const { control = {} } = this.props
    const { type = 'raw' } = control
    let component = <Raw {...this.props} />
    switch (type) {
      case 'button':
        component = <Button {...this.props} />
        break;
      case 'select':
        component = <Select {...this.props} />
        break;
      case 'slider':
        component = <Slider {...this.props} />
        break;
    }
    return component
  }
}

export default Home
