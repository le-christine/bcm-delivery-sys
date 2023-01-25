import React from 'react';
import KanbanBoard from './KanbanBoard.js'
import './App.css';

function App() {
  return (
        <div className="App">
          <header className="nav">
          <h1 className="title">BCM Delivery Monitoring System</h1></header>
          <KanbanBoard/>
        </div>

  );
}

export default App;
