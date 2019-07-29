import React from 'react';
import './css/reset.css';
import './css/timeline.css';
import Header from './components/Header';
import Timeline from './components/Timeline';

function App() {
  return (
    <div id="root">
      <div className="main">
        <Header></Header>
        <Timeline></Timeline>     
      </div> 
    </div> 
  );
}

export default App;
