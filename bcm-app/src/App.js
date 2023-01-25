import React from 'react';
import KanbanBoard from './KanbanBoard.js'
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js'

function App() {
  return (
        <div className="App">
          <NavBar/>
          <KanbanBoard/>
        </div>

  );
}

export default App;
