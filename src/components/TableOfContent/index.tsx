import React, { useMemo, useState } from 'react';

import { TreeNode } from './TreeNode';

import { ActiveItemProvider } from './ActiveItemContext';

import styles from './TableOfContent.module.css';
import { SearchInput } from "../SearchInput";
import Loader from '../Loader';

interface TableOfContentProps {
  nodes: TOCNode[] | null;
  isLoading: boolean;
}

export interface TOCNode {
  id: string;
  title: string;
  level: number;
  path: string;
  children: TOCNode[];
  href: string
}

const flattenTree = (nodes: TOCNode[]): TOCNode[] => {
  return nodes.flatMap((node: TOCNode) => [
    { ...node, children: [], level: 0 },
    ...flattenTree(node.children)
  ]);
};

const buildFilteredList = (nodes: TOCNode[], filter: string): TOCNode[] => {
  return nodes.filter(node => {
    return node.title.toLowerCase().includes(filter.toLowerCase())
  })
}

const Tree: React.FC<{ nodes: TOCNode[] }> = ({ nodes }) => {
  const allNodes = useMemo(() => flattenTree(nodes), [nodes])
  const [currentNodes, setNodes] = useState(nodes)

  return (
    <ActiveItemProvider>
      <nav className={styles.root}>
        <div className={styles.filter}>
          <SearchInput
            placeholder="Type to filter..."
            onFilter={v => {
              if (v === "") {
                setNodes(nodes)
              } else {
                setNodes(buildFilteredList(allNodes, v))
              }
            }}/>
        </div>
        <ul className={styles.tree}>
          {currentNodes.map((node) => (
            <TreeNode key={node.id} node={node}/>
          ))}
          {currentNodes.length === 0 && <p className={styles.noResults}>No results found</p>}
        </ul>
      </nav>
    </ActiveItemProvider>
  )
}

export const TableOfContent: React.FC<TableOfContentProps> = ({ nodes, isLoading }) => {
  if (isLoading) return <Loader />;

  return (
    <Tree nodes={nodes ?? []}/>
  );
};

