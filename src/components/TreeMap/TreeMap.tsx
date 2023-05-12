import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { ListenHistory } from "../../types";


interface TreeMapProps {
    listens: ListenHistory
}

interface ListenNode extends d3.HierarchyNode<any> {};
interface ListenRect implements d3.HierarchyRectangularNode<any> {};


const TreeMap = ({ listens }: TreeMapProps) => {

    const [root, setRoot] = React.useState<ListenNode | null>(null);
    const [rects, setRects] = React.useState<ListenRect[]>([]);

    useEffect(() => {
        const artists = d3.rollup(
            listens,
            (v) => d3.sum(v, (d) => d.seconds),
            (d) => d.artistName,
            (d) => d.trackName
        ); //This is what I want
    
        console.log(artists)
    
        const childrenAccessorFn = ([key, value]: [any, any]) =>
            value.size && Array.from(value);
    
        setRoot(d3
            .hierarchy([null, artists], childrenAccessorFn)
            .sum(([key, value]) => value)
            .sort((a: any, b: any) => b.value - a.value))
    }, [listens])


    // Size of plot
    const width = 1000;
    const height = 600;
    const margin = { top: 30, right: 50, bottom: 130, left: 70 };

    console.log(root)

    if(!root) { return null; }  

    setRects((root) => d3.treemap<ListenNode>().size([width, height]).padding(1)(root).descendants());

    console.log(rects)

    return(
        <>
        <h1>Hello, There</h1>
        {rects.map((node, i) => 
            <rect  
                key={i}
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                fill="steelblue"
        }

        </>
    )
};

export default TreeMap;