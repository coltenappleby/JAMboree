import React from "react";
import { NodeType } from "./types";

export type NodesProps = {
    nodes: NodeType[];
    nodeColor: string;
    radius: number;
}

export const Nodes = ({ nodes, nodeColor, radius }: NodesProps) =>
    nodes.map((node: NodeType) => (
        <circle
            key={node.index}
            cx={node.x}
            cy={node.y}
            r={radius}
            fill={nodeColor}
        />
    )
);

