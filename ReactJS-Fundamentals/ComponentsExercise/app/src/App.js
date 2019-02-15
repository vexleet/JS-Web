import React, { Component } from 'react';
import './App.css';
import Street from './Street/Street';
import House from './House/House';
import HouseDetails from './HouseDetails/HouseDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streets: [],
      selectedStreetIdx: 0,
      selectedHouseIdx: 0,
      hasFetched: false,
    }
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/street/all')
      .then(response => response.json())
      .then(data => {
        this.setState({
          streets: data.streets,
          hasFetched: true,
        })
      });
  }

  getSelectedStreets() {
    return this.state.streets[this.state.selectedStreetIdx].homes;
  }
  
  getSelectedHouse() {
    return this.state.streets[this.state.selectedStreetIdx]
      .homes[this.state.selectedHouseIdx];
  }

  streetHoverEvent(index){
    this.setState({
      selectedStreetIdx: index,
    });
  }

  houseHoverEvent(index){
    this.setState({
      selectedHouseIdx: index,
    });
  }

  render() {
    if (!this.state.hasFetched) {
      return null;
    }
    return (
      <div className="App">
        <div className="streets">
          <h2>Streets</h2>
          {this.state.streets.length > 0 ? this.state.streets.map((street, index) => {
            return (
              <Street location={street.location} key={index} id={index} streetHoverEvent={this.streetHoverEvent.bind(this)}/>
            )
          }) : null}
        </div>

        <div className="houses">
          <h2>Houses</h2>
          {this.getSelectedStreets().map((home, index) => {
            return (
              <House type={home.type} description={home.description} id={index} imageUrl={home.imageUrl} 
              price={home.price} key={index} houseHoverEvent={this.houseHoverEvent.bind(this)}/>
            );
          })}
        </div>

        {this.state.streets.length > 0 ? <HouseDetails type={this.getSelectedHouse().type} 
          description={this.getSelectedHouse().description} imageUrl={this.getSelectedHouse().imageUrl} 
          price={this.getSelectedHouse().price} key={this.state.selectedHouseIdx}/> : null}
      </div>
    )
  }
}

export default App;
