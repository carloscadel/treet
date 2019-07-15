//----------
// TreepDetail View
//----------
import React, { Component } from 'react'
import api from '../../../api'
import Mapbox from '../../partials/Mapbox'

export default class Treep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      formattedDates: '',
      treepUsers: [],
      initialMapCenter: [0, 40]
    }
  }

  handleTreepDelete = () => {
    api
      .deleteTreep(this.props.match.params.id)
      .then(res => console.log('Treep deleted'))
      .catch(err => console.log(err))
  }

  getTreepMetadata() {
    api
      .getTreepMetadata(this.props.match.params.id)
      .then(treepUsers => {
        this.setState({
          treepUsers: [...treepUsers]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getTreepMetadata()
    api.getOneTreep(this.props.match.params.id).then(res => {
      this.setState({
        location: res.location,
        startDate: res.startDate,
        endDate: res.endDate,
        formattedDates: res.formattedDates
      })
    })
  }
  render() {
    return (
      <div>
        <h4>{this.state.location}</h4>
        <p>{this.state.formattedDates}</p>
        <button onClick={this.handleTreepDelete}>Delete treep</button>
        <Mapbox initialMapCenter={this.state.initialMapCenter} />
      </div>
    )
  }
}
