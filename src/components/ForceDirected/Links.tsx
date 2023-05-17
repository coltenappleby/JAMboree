import React from "react";
import { LinkType, NodeType } from "./types";

export type LinksProps = {
    links: LinkType[];
    linkColor: string;
}

export function isNodeType(varOfType: string | number | NodeType): varOfType is NodeType {
    return (varOfType as NodeType).id !== undefined;
  }

export const Links = ({ links, linkColor }: LinksProps) => 

    links.map((link: LinkType) => (
        isNodeType(link.source) && isNodeType(link.target) ? 
        <line
            key={link.source.id + "-" + link.target.id}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke={linkColor}
        /> : null
    ));


