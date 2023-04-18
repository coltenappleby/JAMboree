import React, { useState } from 'react';
import FileUpload from './FileUpload';

import { Listen, ListenHistory } from '../types';
import BasicCard from './dashboard/BasicCard';

import * as d3 from 'd3';
import CalendarHeatMap from './Calendar/CalendarHeatMap';

interface HomePageProps {
    addData: (params: any) => any;
    listens: ListenHistory;
}

function HomePage({addData, listens}: HomePageProps) {

	//   const [data, setData] = useState<ListenHistory>([]);

	//   const addData = (d: ListenHistory) => {
	//     setData(d);
	//   };


	const longestSong = (listens)
		.sort((a: Listen, b: Listen) => b.seconds - a.seconds)
		.slice(0, 1)[0];
	const mostListenToSong = d3.least(d3.rollup(listens,
		(v) => d3.sum(v, (d) => d.seconds),
		(d) => d.trackName
	), ([, sum]) => -sum)

	console.log(mostListenToSong)

	let mostListenedToSong: Listen = longestSong;
	if (mostListenToSong !== undefined) {
    	mostListenedToSong = listens.filter((listen) => listen.trackName === mostListenToSong[0])[0];
	}

	// const mostListenedToSong = listens.filter((listen) => listen.trackName === mostListenToSong[0])[0];

	console.log(listens);

	return (
		<div className="homepage">
			<header className="homepage-header">
				<h1> Welcome to JAMboree</h1>
				<p>Here you can visualize your spotify data</p>
				<p> Drop you listening history below</p>
				<FileUpload addData={addData}/>
				<CalendarHeatMap listens={listens}/>

				{listens.length > 0 && <BasicCard song={mostListenedToSong} />}
			</header>

		</div>
  	);
}

export default HomePage;
