// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// import { Listen, ListenHistory } from '../../types';

// interface TreeMapProps {
//     listens: ListenHistory;
// }

// const TreeMapAutoPilot: React.FC<TreeMapProps> = ({ listens }: TreeMapProps) => {

//     const svgRef = useRef<SVGSVGElement>(null);

//     useEffect(() => {
//         if(listens && svgRef.current){
//             const width = 960;
//             const height = 500;
//             const margin = {top: 20, right: 0, bottom: 30, left: 40};

//             const svg = d3
//                 .select(svgRef.current)
//                 .attr("height", height + margin.top + margin.bottom)
//                 .attr("width", width + margin.left + margin.right)

//             const everything = svg.selectAll("*").remove();

//             const container = svg.append("g")
//                 .classed("container", true)
//                 .attr("transform", `translate(${margin.left}, ${margin.top})`);

//             const artists = d3.rollup(
//                 listens,
//                 (v) => d3.sum(v, (d) => d.seconds),
//                 (d) => d.artistName,
//                 (d) => d.trackName
//             )

//             const childrenAccessorFn = ([key, value]: [any, any]) =>
//                 value.size && Array.from(value);

//             const root = d3
//                 .hierarchy([null, artists], childrenAccessorFn)
//                 .sum(([key, value]) => value.size)
//                 .sort((a: any, b: any) => b.value.size - a.value.size);

//             d3.treemap().size([width, height]).padding(1)(root);



//         }
//     },[])

//     return (
//         <div className="treemap">
//             <h1>Tree Map</h1>
//             <div id="treemap-container"></div>
//             <svg id="treemap-svg" ref={svgRef}/>
//         </div>
//     )
// }

// export default TreeMapAutoPilot;
export {};