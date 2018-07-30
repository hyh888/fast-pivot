import React, { Component } from 'react';
import PivotTable from './components/pivot/index.js'
import 'whatwg-fetch';
import URL from './api.config.js'
import './App.css'
class App extends Component {
  constructor () {
    super()
    this.state = {
      dataSource: [],
      Dimensions: [],
      Measures: [],
      aggFunc: (subset) => {
        return { count: subset.length }
      }
    }
  }
  componentDidMount () {
    let self = this
    fetch(URL, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((res) => {
      self.setState({
        dataSource: res.dataSource,
        Dimensions: res.config.Dimensions,
        Measures: res.config.Measures
      })
    })
  }
  render() {
    return (
      <div className="demo-container">
        <div className="demo-segment">
          <PivotTable 
          aggFunc={this.state.aggFunc}
          dataSource={this.state.dataSource}
          Dimensions={this.state.Dimensions} 
          Measures={this.state.Measures} />
        </div>
      </div>
    );
  }
}

export default App;