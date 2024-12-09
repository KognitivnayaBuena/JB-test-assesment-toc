import React, { useEffect, useState } from 'react';

import TableOfContent from './components/TableOfContent';
import { mapDataToTree, TOCNode } from './components/TableOfContent/utils';
import Placeholder from './components/Placeholder';

import { FocusProvider } from './context/FocusContext';

import styles from './App.module.css';

const App: React.FC = () => {
  const [tocData, setTocData] = useState<TOCNode[]>([]);

  useEffect(() => {
    fetch('/serverData/TOCData.json')
      .then((res) => res.json())
      .then((data) => setTocData(mapDataToTree(data)));
  }, []);

  if (!tocData) return <Placeholder />;

  return (
    <FocusProvider>
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '284px', borderRight: '1px solid #ccc' }}>
          <TableOfContent data={tocData} />
        </aside>
        <main className={styles.main}>
          <h1>Content Area</h1>
        </main>
      </div>
    </FocusProvider>
  );
};

export default App;
