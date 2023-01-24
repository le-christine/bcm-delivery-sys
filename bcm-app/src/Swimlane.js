import { React, Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  padding: 8px;
   border: 1px solid #ddd;
   border-radius: 4px;
   margin-bottom: 8px;
   background-color: #fff;
   user-select:none;
   cursor:pointer;
`;

const Lane = styled.div`
  position: relative;
  background-color: lightblue;
  width:100%;
  height: 700px;
`;


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


class Swimlane extends Component {

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
   // if no destination, return
   if (!result.destination) {
     return;
   }

   const newTrucks = reorder(
     this.props.trucks,
     result.source.index,
     result.destination.index
   );

   console.log("Trucks were rearranged -->", newTrucks);
   this.props.onReorder(newTrucks);
 }

  render() {
    return (
      <div>
      <h2>{this.props.status}</h2>
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={`${this.props.status}`}>
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
            <Lane>
        {this.props.trucks
            .filter(truck => truck.status === this.props.status)
            .map((truck, index) => (
                <Draggable key={truck.id} draggableId={truck.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card>
                            <h3>{truck.driver}</h3>
                            <p>ID: {truck.id}</p>
                            <p>Status: {truck.status}</p>
                        </Card>
                        </div>
                    )}
                </Draggable>
            ))}
            {provided.placeholder}
          </Lane>
          </div>
        )}
        </Droppable>
        </DragDropContext>
        </div>

    );
  }
}

export default Swimlane;
