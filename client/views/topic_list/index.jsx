import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app_state'

@inject('appState')
@observer

export default class TopicList extends React.Component {
  static propTypes = {
    appState: PropTypes.instanceOf(AppState),
  }

  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }


  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    const { appState } = this.props
    return new Promise((resolve) => {
      setTimeout(() => {
        appState.count = 3
        resolve(true)
      })
    })
  }


  changeName(e) {
    const { appState } = this.props
    appState.name = e.target.value
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>
          {appState.msg}
        </span>
      </div>
    )
  }
}
