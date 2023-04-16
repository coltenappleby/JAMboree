import React, { useState } from 'react';
import FileUpload from './FileUpload';

import { Listen, ListenHistory } from '../types';

interface HomePageProps {
    addData: (params: any) => any;
}

function HomePage({addData}: HomePageProps) {

//   const [data, setData] = useState<ListenHistory>([]);

//   const addData = (d: ListenHistory) => {
//     setData(d);
//   };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1> Welcome to JAMboree</h1>
        <p>Here you can visualize your spotify data</p>
        <p> Drop you listening history below</p>
        <FileUpload addData={addData}/>
      </header>
    </div>
  );
}

export default HomePage;
