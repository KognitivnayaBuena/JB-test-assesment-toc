import React from 'react';

import { TableOfContent } from './components/TableOfContent';
import { TOCData } from './components/TableOfContent/types';
import useFetch from './hooks/useFetch';
import { mapDataToTree } from "./components/TableOfContent/utils.ts";
import styles from './App.module.css';

const App: React.FC = () => {
  const [data, loading, error] = useFetch<TOCData>('https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json');

  if (error !== null) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <div className={styles.main}>
      <TableOfContent
        nodes={data && mapDataToTree(data)}
        isLoading={loading}
      />
      <main className={styles.content}>
        <h1>Content Area</h1>
      </main>
    </div>
  )
}

export default App;
