import React from 'react';

import TreeNode from './TreeNode';

import styles from './TableOfContent.module.css';

interface TOCNode {
  id: string;
  title: string;
  path: string;
  url?: string;
  level: number;
  children: TOCNode[];
}

interface TOCProps {
  data: TOCNode[];
}

const TableOfContent: React.FC<TOCProps> = ({ data }) => {
  return (
    <div className={styles.tocContainer}>
      <ul className={styles.tree}>
        {data.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;

