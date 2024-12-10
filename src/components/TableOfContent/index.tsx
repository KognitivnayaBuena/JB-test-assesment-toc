import React from 'react';

import TreeNode from './TreeNode';

import styles from './TableOfContent.module.css';
import { FocusProvider } from '../../context/FocusContext';
import { TOCData } from './types';
import Placeholder from '../Placeholder';
import useFetch from '../../hooks/useFetch';
import { mapDataToTree } from './utils';

const TableOfContent: React.FC = () => {
  const [data, loading, error] = useFetch<TOCData>('/serverData/TOCData.json');

  if (loading) return <Placeholder />;
  if (error) return <div data-testid="error-message">Error: {error.message}</div>;
  const tocData = data ? mapDataToTree(data) : [];

  return (
    <FocusProvider>
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '284px', borderRight: '1px solid #ccc' }}>
        <div className={styles.tocContainer}>
      <ul className={styles.tree}>
        {tocData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
        </aside>
        <main className={styles.main}>
          <h1>Content Area</h1>
        </main>
      </div>
    </FocusProvider>
  );
};

export default TableOfContent;

