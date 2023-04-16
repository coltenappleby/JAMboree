import React, { useEffect, useState } from 'react';
import TreeMap from './TreeMap.js';
import * as d3 from 'd3';

// import history0 from '../../data/spotify/2022/StreamingHistory0.json'
// import history1 from '../../data/spotify/2022/StreamingHistory1.json'



const TreeMapContainer = () => {

    // const [listens, setListens] = useState(null)

    // useEffect(() =>{

    //   // console.log('fetched')

    //   const history = history0.concat(history1)

    //   history.map((listen) => {
    //     listen.seconds = listen.msPlayed / 1000
    //     listen.endTime = new Date(listen.endTime)
    //     listen.startTime = new Date(listen.endTime - listen.msPlayed)
    //     return listen
    //   })

    //   setListens(history)
      
    // }, []);
      
    // // console.log(listens) 

  return (
    <div className=".container">
        {/* <TreeMap listens={listens} /> */}
    </div>
  );
}

export default TreeMapContainer;