import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';

import { Listen, ListenHistory } from './types';


function App() {

  const [data, setData] = useState<ListenHistory>([]);

  const addData = (d: ListenHistory) => {
    setData(d);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome to JAMboree</h1>
        <p>Here you can visualize your spotify data</p>
        <p> Drop you listening history below</p>
        <FileUpload addData={addData}/>
      </header>
    </div>
  );
}

export default App;
