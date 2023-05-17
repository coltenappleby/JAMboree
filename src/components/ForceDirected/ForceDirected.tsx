// Create A Force Directed Graph using d3.js in React. use d3 to calculate the nodes, edges, their locations, and the force. 
// Use React to render the nodes and edges.

import React, { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { useData } from './useData';
import { LinkType, NodeType } from './types';
import { Links } from './Links';
import { Nodes } from './Nodes';
import { ListenHistory, Listen } from '../../types';

const margin = { top: 15, right: 15, bottom: 55, left: 15 }

// Force Directed Graph will offer to take a url OR a data object

export type ForceDirectedProps = {
    listens: ListenHistory;
    nodeColor?: string;
    nodeRadius?: number;
    linkColor?: string;
    height?: number;
    width?: number;
}

export const ForceDirected = ({ 
    listens, // Means you are passed a json object
    height = 2000,
    width = 1400,
    nodeColor = "steelblue",
    nodeRadius = 5,
    linkColor = "grey",

}: ForceDirectedProps) => {
    
    // const data = useData(listens)

    const [animatedNodes, setAnimatedNodes] = useState<NodeType[]>([])
    const [animatedLinks, setAnimatedLinks] = useState<LinkType[]>([])

    useEffect(() => { 

        if(!listens) {
            return
        }

        // Creating the data for the Hierarchy
        // We are going to use d3.rollup because we want a summary value
        // d3.rollup(athletes, v => v.length, d => d.nation, d => d.sport)
        const artists = d3.rollup(
            listens,
            (v) => d3.sum(v, (d) => d.seconds),
            (d) => d.artistName,
            (d) => d.trackName
        ); 

        // This root is going to be undefined because it is the data structure
        // we need this so that the we dont get multiple roots

        const childrenAccessorFn = ([key, value]: [any, any]) =>
            value.size && Array.from(value);
    
        const root = d3
            .hierarchy([null, artists], childrenAccessorFn)
            .sum(([key, value]) => value)
            .sort((a: any, b: any) => b.value - a.value)

        // console.log(root)
        const top100 = root.descendants().slice(100,101)[0]?.value
        // console.log(top100)

        if(!top100)  return 

        // console.log(root.descendants().filter((d) => d.value === undefined))
        // Node data
        const nodes: NodeType[]  = root.descendants().map((node: any) => ({
            id: node.data[0] ? node.data[0] : "Spotfiy",
            r: 5,
        }));
        // Link data
        const links: LinkType[] = root.links().map((link: any) => ({ 
            source: link.source.data[0] ? link.source.data[0] : "Spotfiy",
            target: link.target.data[0] ? link.target.data[0] : "Spotfiy",
        }));

        // console.log(nodes)
        // console.log(links)
        // The force simulation
        const simulation: d3.Simulation<NodeType, LinkType> = d3.forceSimulation<NodeType, LinkType>()
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('charge', d3.forceManyBody().strength(-200))
            .force("x", d3.forceX(width / 2).strength(.9))
            .force("y", d3.forceY(height / 2).strength(.9))
            .force('link', d3.forceLink().id((d: any) => d?.id).distance(0).strength(1))
            // .tick(1000)
        
        // Run the simulation
        simulation.on("tick", () => {
            setAnimatedNodes([...simulation.nodes()])
            // @ts-ignore
            setAnimatedLinks([...simulation.force('link')?.links()])
        });

        simulation.nodes([...nodes])
        // @ts-ignore
        simulation.force('link')?.links([...links]) // Passing the links in. 
        simulation.alpha(0.1).restart();

        // stop simulation on unmount
        // return () => simulation.stop(); 
        
    }, [listens, height, width])

    // If the data is not ready yet, return a loading message
    if (!listens) {
        return <pre>Loading...</pre>;
    }

    return (
		<>
            <>Hello, There</>

			<h1> Force Directed Graph of Spotify Listens </h1>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}> 
                    { Nodes({ 
                        nodes: animatedNodes, 
                        nodeColor: nodeColor, 
                        radius: nodeRadius
                        })}
                    { Links({
                        links: animatedLinks, 
                        linkColor: linkColor,
                    })}
				</g>
			</svg>
		</>
	);
};