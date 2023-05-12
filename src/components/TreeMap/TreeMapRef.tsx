// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";

// import { ListenHistory } from "../../types";


// interface TreeMapRefProps {
//     listens: ListenHistory
// }

// const TreeMapRef = ({ listens }: TreeMapRefProps) => {
//   const svgRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const legendSvg = useRef(null);

//     useEffect(() => {
//         if (listens && svgRef.current) {

//             // Size of plot
//             const width = 1000;
//             const height = 600;
//             const margin = { top: 30, right: 50, bottom: 130, left: 70 };

//             // Setting up the SVG
//             const svg = d3
//                 .select(svgRef.current)
//                 .attr("height", height + margin.top + margin.bottom)
//                 .attr("width", width + margin.left + margin.right)

//             const everything = svg.selectAll("*");
//             everything.remove();

//             const container = svg
//                 .append("g")
//                 .classed("container", true)
//                 .attr("transform", `translate(${margin.left}, ${margin.top})`);

//             // Tooltip
//             let tooltip = container
//                 .append("g")
//                 .attr("id", "tooltip")
//                 .style("opacity", 0);

//             tooltip.append('rect')
//                 .attr('id', 'tooltip-rect')
//                 .attr('opacity', 0)
//                 .style('fill', 'grey')
//                 .attr('x', 0)
//                 .attr('y', 0 )
//                 .attr('height', 20) // Should I remove for a dynamic box?
//                 .attr('width', 80);

//             tooltip.append('text')
//                 .attr('id', 'tooltip-text')
//                 .attr('x', 0)
//                 .attr('y', 0)
//                 .text('')
//                 .style('fill', 'white')
//                 .style('font-size', '14px');

//             let legend = d3
//                 .select("body")
//                 .append("svg")
//                 .attr("id", "legend")
//                 .attr("height", 300)
//                 .attr("width", 900)
//                 .attr("transform", `translate(${0}, ${0})`);

//             //////////////// Load the Data ////////////////
//             const artists = d3.rollup(
//                 listens,
//                 (v) => d3.sum(v, (d) => d.seconds),
//                 (d) => d.artistName,
//                 (d) => d.trackName
//             ); //This is what I want

//             console.log(artists)

//             const childrenAccessorFn = ([key, value]: [any, any]) =>
//                 value.size && Array.from(value);

//             const root = d3
//                 .hierarchy([null, artists], childrenAccessorFn)
//                 .sum(([key, value]) => value)
//                 .sort((a: any, b: any) => b.value - a.value);

//             // d3.treemap().size([width, height]).padding(1)(root);

//             ////////////// Hierarchy Notes ///////////////
//             // 1. root.leaves() -- the lowest leaf
//             // 2. root.children -- the first level of the tree (depth 1)
//             // 3. root.descendants() -- all the nodes in the tree
//             // 4. root.sum() -- the sum of all the values in the tree
//             // 5. root.sort() -- sort the tree
//             // 6. root.path() -- the path from the root to the current node
//             // 7. root.height -- the height of the tree
//             // 8. root.depth -- the depth of the current node
//             // 9. root.parent -- the parent of the current node
//             // 10. root.ancestors() -- all the ancestors of the current node
//             // 11. root.each() -- iterate over all the nodes in the tree
//             // 12. root.eachAfter() -- iterate over all the nodes in the tree after the children have been visited
//             // 13. root.eachBefore() -- iterate over all the nodes in the tree before the children have been visited
//             // 14. root.copy() -- copy the current node
//             // 15. root.count() -- count the number of nodes in the tree
//             // 16. root.leaves() -- the lowest leaf
//             // 17. root.links() -- the links between the nodes
//             // List auto-generated --> Not perfect. Tried to duplicate a few items

//             // const totalTime = d3.sum(root.children.slice(0, 20).map(d => d.value))
//             // console.log(totalTime)
//             // html.select('listens').innerhtml(totalTime)

//             const colors = d3
//                 .scaleOrdinal(d3.schemeAccent)
//                 .domain(root.children.map((d) => d.parent.value));

//             const timeFormat = d3.format(".1f"); // Time Format

//             let nodes = container
//                 .selectAll("g")
//                 .data(root.leaves())
//                 .enter()
//                 .append("g")
//                 .attr("class", "node-group")
//                 .attr(
//                 "transform",
//                 (d) => `translate(${d.x0 + margin.left}, ${d.y0 + margin.top})`
//                 );

//             nodes
//                 .append("rect")
//                 .attr("width", (d) => d.x1 - d.x0)
//                 .attr("height", (d) => d.y1 - d.y0)
//                 .style("fill", (d) => colors(d.parent.value))
//                 .attr("class", "tile");

//             // container 
//             //   .append("rect")
//             //   .attr('className', "mouse-tracker")
//             //   .attr("height", height + margin.top + margin.bottom)
//             //   .attr("width", width + margin.left + margin.right)
//             //   .style("opacity", 0)
//             //   .on("mousemove", (e,d)=> {

//             //     const mousePos = d3.pointer(e, this);
//             //     const currentTile = e.srcElement.__data__;

//             //     tooltip.transition().duration(200).style('opacity', 0.9)
                
//             //     const tooltipXFormat = d3.timeFormat("%m/%d/%Y")	
//             //     const tooltipYFormat = d3.format(".1f")
                
//             //     tooltip.select('#tooltip-rect')
//             //     .attr('opacity', 1)
//             //     .attr('x', mousePos[0])
//             //     .attr('y', mousePos[1])
                
//             //     tooltip.select('#tooltip-text')
//             //     .text(`${currentTile.data[0]}`)
//             //     .attr('x', mousePos[0])
//             //     .attr('y', mousePos[1])
                
//             //   })


            

//             nodes
//                 .on("mousemove", (e, d) => {
//                 // console.log(e)
//                 tooltip.transition().duration(200).style("opacity", 0.9);
//                 tooltip
//                     .html(
//                     `<b>Artist</b>: ${d.parent.data[0]}</br>
//                                 <b>Total Artist Time</b>: ${timeFormat(
//                         d.parent.value / 60
//                     )} minutes </br>
//                                 <b>Song</b>: ${d.data[0]}</br>
//                                 <b>Total Song Time</b>: ${timeFormat(
//                         d.value / 60
//                     )} minutes
//                                 `
//                     )
//                     .style("opacity", 1)
//                 .style("left", e.pageX + "px")
//                 .style("top", e.pageY + "px")
//                 .attr("data-value", d.data.value);
//             })
//                 .on("mouseout", () => {
//                     tooltip.transition().duration(200).style("opacity", 0);
//             });
            


//             // Lets make the Legend
//             const categories = root.children.slice(0, 20); //.map(d => d.data[0])

//             const V_SPACING = 40;
//             const H_SPACING = 200;
//             const cols = Math.floor(categories.length / 5);
//             const RECT_HEIGHT = 20;
//             const RECT_WIDTH = 20;

//             let elements = legend
//                 .selectAll("g")
//                 .data(categories)
//                 .enter()
//                 .append("g")
//                 .attr("transform", (d, i) => {
//                 return `translate(${(i % cols) * H_SPACING}, ${Math.floor(i / cols) * V_SPACING
//                     })`;
//                 });

//             elements //.selectAll('g')
//                 .append("rect")
//                 .attr("x", 0)
//                 .attr("y", 0)
//                 .attr("height", RECT_HEIGHT)
//                 .attr("width", RECT_WIDTH)
//                 .style("fill", (d) => colors(d.value))
//                 .attr("class", "legend-item");

//             elements
//                 .append("text")
//                 .attr("x", RECT_WIDTH * 1.2)
//                 .attr("y", RECT_HEIGHT * 0.8)
//                 .text((d) => d.data[0])
//                 .style("font-size", 15);
//             }
//         });

//         return (
//             <div className="treeMap">
//             <svg ref={svgRef} />
//             <div ref={tooltipRef} className="lc-tooltip">
//                 <div className="data"></div>
//                 <div className="date"></div>
//             </div>
//             <svg ref={legendSvg} />
//             <p> 2022 Spotify Data </p>
//             {/* <a href="https://fred.stlouisfed.org/series/WPS101707">Source: Spo</a> */}
//             </div>
//         );
// };

// export default TreeMap;

export default {};




//  // Mike Bostock Code
//  function wrap(text) {
//   text.each(function () {
//     var text = d3.select(this),
//       words = text.text().split(/\s+/).reverse(),
//       word,
//       width = parseFloat(text.attr("width")),
//       line = [],
//       lineNumber = 0,
//       lineHeight = 1.1, // ems
//       y = text.attr("y"),
//       dy = parseFloat(text.attr("dy")),
//       tspan = text
//         .text(null)
//         .append("tspan")
//         .attr("x", 2)
//         .attr("y", y)
//         .attr("dy", dy + "em");
//     while ((word = words.pop())) {
//       line.push(word);
//       tspan.text(line.join(" "));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(" "));
//         line = [word];
//         tspan = text
//           .append("tspan")
//           .attr("x", 2)
//           .attr("y", y)
//           .attr("dy", ++lineNumber * lineHeight + dy + "em")
//           .text(word);
//       }
//     }
//   });
// }