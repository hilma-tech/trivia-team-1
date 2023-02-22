import React from 'react';
import logo from './logo.svg';
import './App.css';
// import ScoreCard from './components/ScoreCard';
import BasicTable from './components/ScoreCard';
function App() {
  return (
    <div className="App">
      {/* <ScoreCard /> */}
      <BasicTable />
    </div>
  );
}

export default App;
