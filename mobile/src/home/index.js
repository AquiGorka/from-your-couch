import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';


class Home extends PureComponent {

  onClick = () => {
    this.props.onUpdate(JSON.parse(this.refs.data.value))
  }

  render() {
    const { data = {}, history } = this.props
    const { devices = [], types = [] } = data
    return (
      <div className="section">
        <List selectable ripple>
          <ListSubHeader caption='Your devices' />
          {devices.sort((a, b) => a.id > b.id).map(item => {
            const { id, label, type } = item
            const myType = types.find(x => x.id === type)
            const { label: typeLabel } = myType
            return (
              <ListItem key={id}
                avatar='https://maxcdn.icons8.com/Share/icon/User_Interface//horizontal_settings_mixer1600.png'
                caption={label}
                legend={typeLabel}
                onClick={() => {
                  history.push(`/${id}`)
                }}
              />
            )
          })}
        </List>
      </div>
    )
  }
}

export default Home
