import React, { PureComponent } from 'react'
import data from '../../../data.js'
import './styles.css'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

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
            const { state = [], label  } = item
            return (
              <div key={item.id}>
                <Card className="card-layout">
                  <CardTitle
                    title={label}
                    subtitle={typeLabel}
                    />
                <CardText>
                  <ul>
                    {state.sort((a, b) => a.id > b.id).map(curr => {
                      const { controls = [] } = type
                      const control = controls.find(x => x.id === curr.id)
                      const { label: controlLabel = '' } = control
                      return (
                        <li key={`${item.id}_${curr.id}`}>
                          <div>{`${controlLabel}: ${curr.value}`}</div>
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

export default Home
