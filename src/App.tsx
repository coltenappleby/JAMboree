import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Listen, ListenHistory, ListenHistoryRaw, ListenRaw } from './types';
import HomePage from './components/HomePage';
import CalendarHeatMap from './components/Calendar/CalendarHeatMap';
import TreeMap from './components/TreeMap/TreeMap';


import history0 from './data/2022/StreamingHistory0.json';
import history1 from './data/2022/StreamingHistory1.json';
import { ForceDirected } from './components/ForceDirected/ForceDirected';

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

  useEffect(() =>{
	const history = history0.concat(history1)
	addData(history)
}, []);


  return (
    <BrowserRouter>
    	<Routes>
      		<Route path="/" element={<HomePage listens={data} addData={addData} />}/>
        	{/* <Route index element={<Home />} /> */}
        	<Route path="tree-map" element={<TreeMap listens = {data}/>}/>
        	<Route path="heatmap" element={<CalendarHeatMap listens = {data}/>}/>
			<Route path="force-graph" element={<ForceDirected listens={data} />} />


        	<Route path="*" element={<HomePage listens={data} addData={addData}/>} />
    	</Routes>
  </BrowserRouter>
  );
}

export default App;
