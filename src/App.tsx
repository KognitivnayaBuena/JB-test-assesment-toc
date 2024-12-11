import React from 'react';

import { TableOfContent } from './components/TableOfContent';
// import { TOCData } from './components/TableOfContent/types';
// import useFetch from './hooks/useFetch';
import { mapDataToTree } from "./components/TableOfContent/utils.ts";
import styles from './App.module.css';
import mockData from '../serverData/TOCData.json';


const App: React.FC = () => {
  // const [data, loading, error] = useFetch<TOCData>('/serverData/TOCData.json');

  // if (error !== null) {
  //   return <div>Something went wrong: {error.message}</div>;
  // }

  return (
    <div className={styles.main}>
      <TableOfContent
        nodes={mockData && mapDataToTree(mockData)}
        isLoading={false}
      />
      <main className={styles.content}>
        <h1>Content Area</h1>
      </main>
    </div>
  )
}

export default App;
