import { useState, useEffect } from 'react';
import initialData from './initial-data';
import Swimlane from './Swimlane.js';
import './kanban.css'

function KanbanBoard() {
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8081/trucks');
                const data = await response.json();
                setTrucks(data);
                console.log("Successfully fetched truck data:",data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
      <div className="kanban-board">
      {initialData.truckStatus.map(status => {
      return(
        <div className="kanban-lane">
          <Swimlane trucks={trucks} status={status}></Swimlane>
        </div>
      )})}
      </div>

);
}

export default KanbanBoard;
