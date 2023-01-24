import { Component, useState, useEffect } from 'react';
import initialData from './initial-data';
import Swimlane from './Swimlane.js';
import './kanban.css'


class KanbanBoard extends Component {
  componentDidMount() {
    this.fetchData();
  }

  constructor(props) {
    super(props);
    this.state = {
      trucks: []
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReorder = (newTrucks) => {
    this.setState({ trucks: newTrucks });
  }

  async fetchData() {
        try {
            const response = await fetch('http://localhost:8081/trucks');
            const data = await response.json();
            this.setState({trucks: data});
            console.log("Successfully fetched truck data:",data)
        } catch (error) {
            console.error(error);
      }
  }

 handleSubmit(e){
      e.preventDefault();
      let driverName = e.target[0].value;
      console.log("Adding new truck!")
      try {
        fetch ('http://localhost:8081/trucks/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'driver': driverName,
              'status': 'Loading at Warehouse'
            })
      }).then(res => {
        this.fetchData();
        console.log('Truck added Successfully!')
      })
    } catch (error) {
        console.log(error);
      }
      e.target[0].value = "";
    }


    // useEffect(() => {
    //     fetchData();
    // }, []);

render() {
    return (
      <div>
      {this.state.trucks.length >= 8 ? null :   <form onSubmit = {this.handleSubmit}>
        <label>Driver: <input type="text" name="name" /></label>
        <input type="submit" value="Add Truck" />
        </form>
      }

      <div className="kanban-board">
      {initialData.truckStatus.map((status, index) => {
      return(
        <div className="kanban-lane" key={index}>
        <Swimlane trucks={this.state.trucks} status={status} onReorder={this.handleReorder}></Swimlane>
        </div>
      )})}
      </div>
      </div>)
    }
}

export default KanbanBoard;
