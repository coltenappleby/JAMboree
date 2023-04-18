import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Listen, ListenHistory, ListenHistoryRaw, ListenRaw } from './types';
import HomePage from './components/HomePage';
// import TreeMap from './components/TreeMap/TreeMapAutoPilot';


function App() {

  const [data, setData] = useState<ListenHistory>([]);

  const addData = (d: ListenHistoryRaw) => {

    const listensRefined: ListenHistory = d.map((listen: ListenRaw) => {

		return {
			endTime: new Date(listen.endTime),
			seconds: listen.msPlayed / 1000,
			startTime: new Date(new Date(listen.endTime).valueOf() - listen.msPlayed),
			trackName: listen.trackName,
			artistName: listen.artistName
		}
    })
    setData(listensRefined);
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage listens={data} addData={addData} />}>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="tree-map" element={<TreeMap listens = {data}/>}/> */}

        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
