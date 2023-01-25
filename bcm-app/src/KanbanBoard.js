import { Component } from 'react';
import initialData from './initial-data';
import Swimlane from './Swimlane.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './kanban.css'


class KanbanBoard extends Component {
  componentDidMount() {
    this.fetchData();
  }

  constructor(props) {
    super(props);
    this.state = {
      truckByStatus: initialData.truckByStatus
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmitNewTruck = this.handleSubmitNewTruck.bind(this);
    this.handleSubmitEditTruck = this.handleSubmitEditTruck.bind(this);
    this.handleSubmitDeleteTruck = this.handleSubmitDeleteTruck.bind(this);
  }

  handleReorder = (status, newTrucks) => {
    this.setState(prevState => {
      return {
        truckByStatus: {
          ...prevState.truckByStatus,
          [status]: { trucks: newTrucks }
        }
      }
    });
  }



  async fetchData() {
    try {
      const response = await fetch('https://3nrl59woq6.execute-api.us-east-1.amazonaws.com/dev/trucks');
      const data = await response.json();
      // update statuses object with the fetched data
      console.log("Successfully fetched truck data:",data);
      const transformedData = Object.keys(initialData.truckByStatus).reduce((acc, key) => {
        acc[key] = { trucks: data.filter(truck => truck.status === key) };
        return acc;
      }, {});
      this.setState({truckByStatus: transformedData});
    } catch (error) {
      console.error(error);
    }
  }


  handleSubmitNewTruck(e){
    e.preventDefault();
    let driverName = e.target[0].value;
    console.log("Adding new truck!")
    try {
      fetch ('https://3nrl59woq6.execute-api.us-east-1.amazonaws.com/dev/trucks/add', {
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


  handleSubmitEditTruck(e) {
    e.preventDefault();
    let truckId = e.target[0].value;
    let driverName = e.target[1].value;
    let status = e.target[2].value;
    console.log(truckId,driverName,status)


    // Fetch request here;
    try {
      fetch (`https://3nrl59woq6.execute-api.us-east-1.amazonaws.com/dev/trucks/${truckId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': truckId,
          'driver': driverName,
          'status': status
        })
      }).then(res => {
        this.fetchData();
        console.log('Truck edited Successfully!')
      })
    } catch (error) {
      console.log(error);
    }

    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  }



  handleSubmitDeleteTruck(e) {
    e.preventDefault();
    let truckId = e.target[0].value;

    try {
      fetch (`https://3nrl59woq6.execute-api.us-east-1.amazonaws.com/dev/trucks/${truckId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(res => {
        this.fetchData();
        console.log('Truck deleted Successfully!')
      })
    } catch (error) {
      console.log(error);
    }

    console.log(truckId)
    e.target[0].value = "";
  }

  render() {
    return (
      <div>
      <h4>Add New Truck</h4>
      <form onSubmit={this.handleSubmitNewTruck}>
      <label>Driver: <input required type="text" name="name" /></label>
      <input type="submit" value="Add Truck" />
      </form>

      <h4>Edit Truck</h4>
      <form onSubmit={this.handleSubmitEditTruck}>
      <label>Id: <input required type="number" name="name" min="1" max="8"/></label>
      <label>Driver: <input required type="text" name="name" /></label>
      <label>Status: <select required name="statuses" id="status">
  <option value='Loading at Warehouse'>Loading at Warehouse</option>
  <option value='Outbound for deliveries'>Outbound for deliveries</option>
  <option value='Returning to warehouse'>Returning to warehouse</option>
  <option value='Maintenance'>Maintenance</option>
</select></label>
      <input type="submit" value="Edit Truck" />
      </form>

      <h4>Delete Truck</h4>
      <form onSubmit={this.handleSubmitDeleteTruck}>
      <label>Id: <input required type="number" name="name" min="1" max="8"/></label>
      <input type="submit" value="Delete Truck" />
      </form>



      <div>
      <DragDropContext onDragEnd={this.handleReorder}>
      <Droppable droppableId="all-lanes" direction="horizontal" >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-board">
        {Object.keys(this.state.truckByStatus).map((status, index) => (
          <Droppable key={status} droppableId={status}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
            <Swimlane trucks={this.state.truckByStatus[status].trucks} status={status} onReorder={this.handleReorder} />
            </div>
          )}
          </Droppable>
        ))}
        {provided.placeholder}
        </div>
      )}
      </Droppable>
      </DragDropContext>
      </div>
      </div>
    )
  }
}



export default KanbanBoard;
