import './App.css';
import React from 'react';
import Game from './components/Game'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="Body">
          <div className="Info">
            <h2> Word Tower</h2>
          </div>
          <div className="Game">
            <Game></Game>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
