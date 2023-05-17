export interface NodeType extends d3.SimulationNodeDatum {
    id: string;
}
export interface LinkType extends d3.SimulationLinkDatum<NodeType> {}