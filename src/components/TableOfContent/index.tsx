import React from 'react';

import Placeholder from '../Placeholder';
import ErrorMessage from '../ErrorMessage';
import TreeNode from './TreeNode';

import { FocusProvider } from '../../context/FocusContext';
import { TOCData } from './types';
import { mapDataToTree } from './utils';

import styles from './TableOfContent.module.css';

interface TableOfContentProps {
  data: TOCData | null;
  loading: boolean;
  error: Error | null;
}

const TableOfContent: React.FC<TableOfContentProps> = ({data, loading, error}) => {
  if (loading) return <Placeholder />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  const tocData = data ? mapDataToTree(data) : [];

  return (
    <FocusProvider>
      <div className={styles.tocWrapper}>
        <nav className={styles.sidebarNavigation}>
          <div className={styles.tocContainer}>
            <ul className={styles.tree}>
              {tocData.map((node) => (
                <TreeNode key={node.id} node={node} />
              ))}
            </ul>
          </div>
        </nav>
        <main className={styles.main}>
          <h1>Content Area</h1>
        </main>
      </div>
    </FocusProvider>
  );
};

export default TableOfContent;

