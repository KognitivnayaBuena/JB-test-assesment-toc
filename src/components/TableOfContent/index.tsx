import React from 'react';

import TreeNode from './TreeNode';

import styles from './TableOfContent.module.css';
import { FocusProvider } from '../../context/FocusContext';
import { TOCData } from './types';
import Placeholder from '../Placeholder';
import useFetch from '../../hooks/useFetch';
import { mapDataToTree } from './utils';
import ErrorMessage from '../ErrorMessage';

const TableOfContent: React.FC = () => {
  const [data, loading, error] = useFetch<TOCData>('/serverData/TOCData.json');

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

